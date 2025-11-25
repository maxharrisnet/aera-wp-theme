import React, { Component } from 'react';
import PropTypes from 'prop-types';
import videoFile from 'assets/RobotArm_Animation_01.mp4';
import s from './AlphaVideo.scss';

export default class AlphaVideo extends Component {

  static propTypes = {
    children: PropTypes.node,
  }

  size = {
    width: 800,
    height: 1264,
  };

  componentDidMount() {
    const outputCanvas = this.outputEl;
    const output = outputCanvas.getContext('2d');
    const bufferCanvas = this.bufferEl;
    const buffer = bufferCanvas.getContext('2d');
    const video = this.videoEl;

    const { width } = this.size;
    const height = this.size.height / 2;

    this.videoEl.crossOrigin = 'anonymous';

    const processFrame = () => {
      buffer.drawImage(video, 0, 0);

      // this can be done without alphaData, except in Firefox which doesn't
      // like it when image is bigger than the canvas
      const image = buffer.getImageData(0, 0, width, height);
      const imageData = image.data;
      const alphaData = buffer.getImageData(0, height, width, height).data;

      for (let i = 3, len = imageData.length; i < len; i += 4) {
        imageData[i] = alphaData[i - 1];
      }

      output.putImageData(image, 0, 0, 0, 0, width, height);

      this.animationFrame = requestAnimationFrame(processFrame);
    };

    // this.videoEl.addEventListener('play', () => {
    // }, false);

    this.animationFrame = requestAnimationFrame(processFrame);
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.animationFrame);
  }

  render() {
    const { width, height } = this.size;

    return (
      <div className={s.alphaVideo}>
        <video
          className={s.alphaVideo__video}
          style={{ display: 'none' }}
          width={width}
          height={height}
          src={videoFile}
          autoPlay
          loop
          ref={el => (this.videoEl = el)}
          crossOrigin="anonymous"
        />
        <canvas
          className={s.alphaVideo__canvasBuffer}
          style={{ display: 'none' }}
          width={width}
          height={height}
          ref={el => (this.bufferEl = el)}
        />
        <canvas
          className={s.alphaVideo__canvasOutput}
          width={width}
          height={height / 2}
          ref={el => (this.outputEl = el)}
        />
      </div>
    );
  }
}
