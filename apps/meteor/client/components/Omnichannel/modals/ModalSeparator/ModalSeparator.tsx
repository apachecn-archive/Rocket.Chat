import type { FC } from 'react';
import React from 'react';

import './style.css';

const ModalSeparator: FC<{ text: string }> = ({ text, ...props }) => (
	<h6 className='modal-separator' {...props}>
		{text}
	</h6>
);

export default ModalSeparator;
