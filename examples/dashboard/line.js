export default {
  functional: true,
  // To compensate for the lack of an instance,
  // we are now provided a 2nd context argument.
  render: function (createElement, { data: { style }, props: { lineData }}) {
    return createElement('line', {
      attrs: {
        label: 'Press F2 to swap to bar graph',
        data: lineData,
        barWidth: 4,
        barSpacing: 6,
        xOffset: 0,
        maxHeight: 9,
        align: 'center',
        valign: 'middle',
        border: { type: 'line' },
        style: style,
        top: 0,
        left: 0,
        width: 100,
        height: 20
      }
    })
    // ...
  }
}
