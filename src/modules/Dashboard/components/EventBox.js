/**
 * @file  统计数据展示格子
 * @author Created by geekzwb on 2017/11/4.
 */
import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

class EventBox extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      canvas: null
    };
  }

  /**
   * 绘制canvas
   * 一个圆环
   * opts.parent 插入到哪里 一个JS元素对象
   * opts.width 宽度 = 2* (半径+弧宽)
   * opts.radius 半径
   * opts.arc 弧宽
   * opts.percent 百分比
   * opts.color 弧渲染颜色 [底色,进度色]
   * opts.textColor 文字渲染颜色
   * opts.textSize 文字渲染大小
   * opts.animated 是否以动画的方式绘制 默认false
   * opts.after 绘制完成时执行函数
   * ==================================
   **/
  drawRing(ctx, opts) {
    var _opts = {
      width: 70,
      radius: 30,
      arc: 5,
      percent: 30,
      color: ['#ccc', '#042b61'],
      textColor: '#000',
      textSize: '12px',
      animated: true,
      after: function () {
      }
    }, k;
    for (k in opts) _opts[k] = opts[k];

    let width = _opts.width,
      radius = _opts.radius, // 半径
      arc = _opts.arc,
      percent = parseFloat(_opts.percent),
      color = _opts.color,
      textSize = _opts.textSize,
      textColor = _opts.textColor,
      x = 0,
      animated = _opts.animated,
      after = _opts.after;

    ctx.canvas.width = width;
    ctx.canvas.height = width;

    function clearFill() {
      ctx.clearRect(0, 0, width, width);
    }

    function fillBG() {
      ctx.beginPath();
      ctx.lineWidth = arc;
      ctx.strokeStyle = color[0];
      ctx.arc(width / 2, width / 2, radius, 0, 2 * Math.PI);
      ctx.stroke();
    }

    function fillArc(x) {
      ctx.beginPath();
      ctx.lineWidth = arc;
      ctx.strokeStyle = color[1];
      ctx.arc(width / 2, width / 2, radius, -90 * Math.PI / 180, (x * 3.6 - 90) * Math.PI / 180);
      ctx.stroke();
    }

    function fillText(x) {
      ctx.font = textSize + ' Arial';
      ctx.fillStyle = textColor;
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'center';
      ctx.fillText(x + '%', width / 2, width / 2);
    }

    function fill(x) {
      fillBG();
      fillArc(x);
      fillText(x);
    }

    //if (!animated) return fill(percent);
    return fill(percent);

    /*fill(x);
     //console.log('percent', percent); 22.71
     !function animate() {
     //console.log('percent', percent); NAN??????
     if (++x > percent) {
     clearFill();
     fill(percent);
     return after && after();
     }
     // 考虑性能
     setTimeout(animate, 5);
     clearFill();
     fill(x);
     }();*/
  }

  /**
   * didMount 绘制圆环 canvas
   */
  componentDidMount() {
    const ctx = this.refs.canvas.getContext('2d');
    let options = {
      ...this.props.options
    };
    this.drawRing(ctx, options);
  }

  componentDidUpdate() {
    const ctx = this.refs.canvas.getContext('2d');
    let options = {
      ...this.props.options
    };
    this.drawRing(ctx, options);
  }

  shouldComponentUpdate(nextProps, nextState) {
    // don't understand
    return !(this.props.eventsCount === nextProps.eventsCount && this.props.options === nextProps.options);
    //return false;
  }

  render() {
    return (<div style={{...this.props.style, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <div style={{flex: 1, height:this.props.options.width}}>
        <canvas ref="canvas"/>
      </div>
      <div style={{flex: 2, marginLeft: '20px'}}>
        <div>{this.props.eventsCount}</div>
        <div style={{fontSize: '12px', color:'#999'}}>{this.props.title}</div>
      </div>
    </div>);
  }
}

EventBox.propTypes = {
  style: PropTypes.object,
  options: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  eventsCount: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
};

export default EventBox;