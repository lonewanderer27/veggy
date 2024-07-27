import { NativeModulesProxy, EventEmitter, Subscription } from 'expo-modules-core';

// Import the native module. On web, it will be resolved to VeriluxeModel.web.ts
// and on native platforms to VeriluxeModel.ts
import VeriluxeModelModule from './src/VeriluxeModelModule';
import VeriluxeModelView from './src/VeriluxeModelView';
import { ChangeEventPayload, VeriluxeModelViewProps } from './src/VeriluxeModel.types';

// Get the native constant value.
export const PI = VeriluxeModelModule.PI;

export function hello(): string {
  return VeriluxeModelModule.hello();
}

export async function setValueAsync(value: string) {
  return await VeriluxeModelModule.setValueAsync(value);
}

const emitter = new EventEmitter(VeriluxeModelModule ?? NativeModulesProxy.VeriluxeModel);

export function addChangeListener(listener: (event: ChangeEventPayload) => void): Subscription {
  return emitter.addListener<ChangeEventPayload>('onChange', listener);
}

export { VeriluxeModelView, VeriluxeModelViewProps, ChangeEventPayload };
