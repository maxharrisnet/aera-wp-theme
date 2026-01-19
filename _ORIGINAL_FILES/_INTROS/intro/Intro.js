import React, { Component } from 'react';
import PropTypes from 'prop-types';
import s from './Intro.scss';

export default class Intro extends Component {
	static propTypes = {
		title: PropTypes.string,
		titleLineTwo: PropTypes.string,
		text: PropTypes.string,
		fullHeight: PropTypes.bool,
	};

	render() {
		const { title, titleLineTwo, text, fullHeight } = this.props;

		return (
			<div className={s(s.intro, { fullHeight })}>
				<div className={s.intro__container}>
					<h1 className={s.intro__title}>
						{title}
						{titleLineTwo && (
							<span>
								<br />
								{titleLineTwo}
							</span>
						)}
					</h1>
					{text &&
						text
							.split('\n')
							.filter((p) => p !== '')
							.map((paragraph, i) => (
								<p
									className={s.intro__text}
									key={i}
								>
									{paragraph}
								</p> // eslint-disable-line
							))}
				</div>
			</div>
		);
	}
}
