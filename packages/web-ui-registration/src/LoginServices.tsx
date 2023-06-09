import { ButtonGroup, Divider } from '@rocket.chat/fuselage';
import { useLoginServices } from '@rocket.chat/ui-contexts';
import type { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import LoginServicesButton from './LoginServicesButton';

const Services = ({ disabled }: { disabled?: boolean }): ReactElement | null => {
	const { t } = useTranslation();
	const services = useLoginServices();

	if (services.length === 0) {
		return null;
	}

	return (
		<>
			<Divider mb={24} p={0} children={t('registration.component.form.divider')} />
			<ButtonGroup vertical stretch small>
				{services.map((service) => (
					<LoginServicesButton disabled={disabled} key={service.service} {...service} />
				))}
			</ButtonGroup>
		</>
	);
};
export default Services;
