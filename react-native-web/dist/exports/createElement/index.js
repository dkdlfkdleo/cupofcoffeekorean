/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

'use client';

import AccessibilityUtil from '../../modules/AccessibilityUtil';
import createDOMProps from '../../modules/createDOMProps';
import React from 'react';
import { LocaleProvider } from '../../modules/useLocale';
var createElement = (component, props, options) => {
  // Use equivalent platform elements where possible.
  var accessibilityComponent;
  if (component && component.constructor === String) {
    accessibilityComponent = AccessibilityUtil.propsToAccessibilityComponent(props);
  }
  var Component = accessibilityComponent || component;
  var domProps = createDOMProps(Component, props, options);
  var element = /*#__PURE__*/React.createElement(Component, domProps);

  // Update locale context if element's writing direction prop changes
  var elementWithLocaleProvider = domProps.dir ? /*#__PURE__*/React.createElement(LocaleProvider, {
    children: element,
    direction: domProps.dir,
    locale: domProps.lang
  }) : element;
  return elementWithLocaleProvider;
};
export default createElement;