<?php
/**
 * Find all occurrences of "images.ctfassets.net" in the WordPress database.
 * Reports table name, row ID, column, and a short snippet so you can fix or replace.
 *
 * Usage: wp eval-file wp-content/themes/aera-technology/scripts/find-cdn-urls-in-db.php
 */

if (!defined('ABSPATH')) {
    require_once dirname(__DIR__, 4) . '/wp-load.php';
}

global $wpdb;
$search = 'images.ctfassets.net';
$like = $wpdb->esc_like($search);
$like = '%' . $like . '%';

// Get all tables in the current database (not just $wpdb property names)
$table_list = $wpdb->get_col('SHOW TABLES');
$tables = array_values($table_list);

$found = [];
foreach ($tables as $table) {
    if ($wpdb->get_var("SHOW TABLES LIKE '{$table}'") !== $table) {
        continue;
    }
    $cols = $wpdb->get_results("SHOW COLUMNS FROM `{$table}`");
    foreach ($cols as $col) {
        $type = strtolower($col->Type);
        if (strpos($type, 'char') === false && strpos($type, 'text') === false && strpos($type, 'blob') === false) {
            continue;
        }
        $colname = $col->Field;
        $ids = $wpdb->get_results($wpdb->prepare(
            "SELECT * FROM `{$table}` WHERE `{$colname}` LIKE %s",
            $like
        ), ARRAY_A);
        if (empty($ids)) {
            continue;
        }
        foreach ($ids as $row) {
            $id_col = null;
            $id_val = null;
            $extra = '';
            if (isset($row['ID'])) {
                $id_col = 'ID';
                $id_val = $row['ID'];
            } elseif (isset($row['id'])) {
                $id_col = 'id';
                $id_val = $row['id'];
            } elseif (isset($row['post_id'])) {
                $id_col = 'post_id';
                $id_val = $row['post_id'];
                if (isset($row['meta_key'])) {
                    $extra = ' | meta_key: ' . $row['meta_key'];
                }
            } elseif (isset($row['option_id'])) {
                $id_col = 'option_id';
                $id_val = $row['option_id'];
                if (isset($row['option_name'])) {
                    $extra = ' | option_name: ' . $row['option_name'];
                }
            } else {
                $id_val = '(no id col)';
            }
            $val = $row[$colname];
            $pos = strpos($val, $search);
            $start = max(0, $pos - 40);
            $snippet = substr($val, $start, 120);
            $snippet = str_replace(["\r", "\n"], [' ', ' '], $snippet);
            $found[] = [
                'table' => $table,
                'column' => $colname,
                'id_col' => $id_col,
                'id_val' => $id_val,
                'extra' => $extra,
                'snippet' => $snippet,
            ];
        }
    }
}

echo "Found " . count($found) . " row(s) containing '{$search}':\n\n";
foreach ($found as $f) {
    $id = $f['id_col'] ? "{$f['id_col']}={$f['id_val']}" : $f['id_val'];
    echo "Table: {$f['table']} | Column: {$f['column']} | {$id}{$f['extra']}\n";
    echo "  Snippet: ..." . trim($f['snippet']) . "...\n\n";
}
