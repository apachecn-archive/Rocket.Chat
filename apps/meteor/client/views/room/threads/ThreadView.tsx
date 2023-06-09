import { css } from '@rocket.chat/css-in-js';
import { Modal, Box } from '@rocket.chat/fuselage';
import { useLayoutContextualBarExpanded, useTranslation } from '@rocket.chat/ui-contexts';
import type { ComponentProps } from 'react';
import React, { useCallback, useMemo, forwardRef } from 'react';

import VerticalBar from '../../../components/VerticalBar';

type ThreadViewProps = ComponentProps<typeof Box> & {
	title: string;
	expanded: boolean;
	following: boolean;
	onToggleExpand: (expanded: boolean) => void;
	onToggleFollow: (following: boolean) => void;
	onClose: () => void;
	onClickBack: (e: unknown) => void;
};

const ThreadView = forwardRef<HTMLElement, ThreadViewProps>(function ThreadView(
	{ title, expanded, following, onToggleExpand, onToggleFollow, onClose, onClickBack },
	ref,
) {
	const hasExpand = useLayoutContextualBarExpanded();

	const style = useMemo(
		() =>
			document.dir === 'rtl'
				? {
						left: 0,
						borderTopRightRadius: 4,
				  }
				: {
						right: 0,
						borderTopLeftRadius: 4,
				  },
		[],
	);

	const t = useTranslation();

	const expandLabel = expanded ? t('Collapse') : t('Expand');
	const expandIcon = expanded ? 'arrow-collapse' : 'arrow-expand';

	const handleExpandActionClick = useCallback(() => {
		onToggleExpand(expanded);
	}, [expanded, onToggleExpand]);

	const followLabel = following ? t('Following') : t('Not_Following');
	const followIcon = following ? 'bell' : 'bell-off';

	const handleFollowActionClick = useCallback(() => {
		onToggleFollow(following);
	}, [following, onToggleFollow]);

	const expandedThreadStyle =
		hasExpand && expanded
			? css`
					max-width: 855px !important;
					@media (min-width: 780px) and (max-width: 1135px) {
						max-width: calc(100% - var(--sidebar-width)) !important;
					}
			  `
			: undefined;

	return (
		<>
			{hasExpand && expanded && <Modal.Backdrop onClick={onClose} />}

			<Box flexGrow={1} position={expanded ? 'static' : 'relative'}>
				<VerticalBar
					rcx-thread-view
					className={expandedThreadStyle}
					position={hasExpand && expanded ? 'fixed' : 'absolute'}
					display='flex'
					flexDirection='column'
					width={'full'}
					overflow='hidden'
					zIndex={100}
					insetBlock={0}
					style={style} // workaround due to a RTL bug in Fuselage
				>
					<VerticalBar.Header>
						{onClickBack && <VerticalBar.Action onClick={onClickBack} title={t('Back_to_threads')} name='arrow-back' />}
						<VerticalBar.Text dangerouslySetInnerHTML={{ __html: title }} />
						{hasExpand && <VerticalBar.Action title={expandLabel} name={expandIcon} onClick={handleExpandActionClick} />}
						<VerticalBar.Actions>
							<VerticalBar.Action title={followLabel} name={followIcon} onClick={handleFollowActionClick} />
							<VerticalBar.Close onClick={onClose} />
						</VerticalBar.Actions>
					</VerticalBar.Header>
					<VerticalBar.Content
						ref={ref}
						{...{
							flexShrink: 1,
							flexGrow: 1,
							paddingInline: 0,
						}}
					/>
				</VerticalBar>
			</Box>
		</>
	);
});

export default ThreadView;
