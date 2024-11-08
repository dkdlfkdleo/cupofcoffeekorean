/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */

'use client';

import * as React from 'react';
import { useMemo, useRef } from 'react';
import pick from '../../modules/pick';
import useMergeRefs from '../../modules/useMergeRefs';
import usePressEvents from '../../modules/usePressEvents';
import { warnOnce } from '../../modules/warnOnce';
var forwardPropsList = {
  accessibilityDisabled: true,
  accessibilityLabel: true,
  accessibilityLiveRegion: true,
  accessibilityRole: true,
  accessibilityState: true,
  accessibilityValue: true,
  children: true,
  disabled: true,
  focusable: true,
  nativeID: true,
  onBlur: true,
  onFocus: true,
  onLayout: true,
  testID: true
};
var pickProps = props => pick(props, forwardPropsList);
function TouchableWithoutFeedback(props, forwardedRef) {
  warnOnce('TouchableWithoutFeedback', 'TouchableWithoutFeedback is deprecated. Please use Pressable.');
  var delayPressIn = props.delayPressIn,
    delayPressOut = props.delayPressOut,
    delayLongPress = props.delayLongPress,
    disabled = props.disabled,
    focusable = props.focusable,
    onLongPress = props.onLongPress,
    onPress = props.onPress,
    onPressIn = props.onPressIn,
    onPressOut = props.onPressOut,
    rejectResponderTermination = props.rejectResponderTermination;
  var hostRef = useRef(null);
  var pressConfig = useMemo(() => ({
    cancelable: !rejectResponderTermination,
    disabled,
    delayLongPress,
    delayPressStart: delayPressIn,
    delayPressEnd: delayPressOut,
    onLongPress,
    onPress,
    onPressStart: onPressIn,
    onPressEnd: onPressOut
  }), [disabled, delayPressIn, delayPressOut, delayLongPress, onLongPress, onPress, onPressIn, onPressOut, rejectResponderTermination]);
  var pressEventHandlers = usePressEvents(hostRef, pressConfig);
  var element = React.Children.only(props.children);
  var children = [element.props.children];
  var supportedProps = pickProps(props);
  supportedProps.accessibilityDisabled = disabled;
  supportedProps.focusable = !disabled && focusable !== false;
  supportedProps.ref = useMergeRefs(forwardedRef, hostRef, element.ref);
  var elementProps = Object.assign(supportedProps, pressEventHandlers);
  return /*#__PURE__*/React.cloneElement(element, elementProps, ...children);
}
var MemoedTouchableWithoutFeedback = /*#__PURE__*/React.memo(/*#__PURE__*/React.forwardRef(TouchableWithoutFeedback));
MemoedTouchableWithoutFeedback.displayName = 'TouchableWithoutFeedback';
export default MemoedTouchableWithoutFeedback;