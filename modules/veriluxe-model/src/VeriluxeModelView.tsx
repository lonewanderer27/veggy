import { requireNativeViewManager } from 'expo-modules-core';
import * as React from 'react';

import { VeriluxeModelViewProps } from './VeriluxeModel.types';

const NativeView: React.ComponentType<VeriluxeModelViewProps> =
  requireNativeViewManager('VeriluxeModel');

export default function VeriluxeModelView(props: VeriluxeModelViewProps) {
  return <NativeView {...props} />;
}
