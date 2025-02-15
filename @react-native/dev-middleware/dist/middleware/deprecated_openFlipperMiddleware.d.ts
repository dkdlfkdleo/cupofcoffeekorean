/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 * @format
 * @oncall react_native
 */

import type { Logger } from "../types/Logger";
import type { NextHandleFunction } from "connect";
type Options = Readonly<{ logger?: Logger }>;
/**
 * Open the legacy Flipper debugger (Hermes).
 *
 * @deprecated This replicates the pre-0.73 workflow of opening Flipper via the
 * `flipper://` URL scheme, failing if Flipper is not installed locally. This
 * flow will be removed in a future version.
 */
declare function deprecated_openFlipperMiddleware(
  $$PARAM_0$$: Options
): NextHandleFunction;
export default deprecated_openFlipperMiddleware;
