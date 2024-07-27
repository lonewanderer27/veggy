import * as React from 'react';

import { VeriluxeModelViewProps } from './VeriluxeModel.types';

export default function VeriluxeModelView(props: VeriluxeModelViewProps) {
  return (
    <div>
      <span>{props.name}</span>
    </div>
  );
}
