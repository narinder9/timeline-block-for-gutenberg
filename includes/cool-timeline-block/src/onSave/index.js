import { subscribe, select } from '@wordpress/data';

let isUpdatingTimelineBlockId = false;

if (window.CtlbCPTimelineBlock && subscribe) {

    const updateTimelineBlockId = (status) => {
        const globalCTLB = window.CtlbCPTimelineBlock;
        const { getCurrentPostId } = select('core/editor');

        const postId = getCurrentPostId();

        fetch(globalCTLB.ajaxURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                post_id: postId,
                action: 'ctlb_asset_loading_update',
                assets_loading_meta: status,
                assets_loading_key: globalCTLB.assetLoadingUpdateKey,
            }),
        }).then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        }).then(result => {
            isUpdatingTimelineBlockId = false;
            if (result && result.success && result.data.updateValue) {
                window.CtlbCPTimelineBlock.assetsLoadingMeta = result.data.updateValue;
            }
        }).catch(error => {
            isUpdatingTimelineBlockId = false;
            console.log('Timeline Block Assets Updating Error: ', error);
        })
    }

    subscribe(() => {
        const {
            isCurrentPostPublished,
            isSavingPost,
            isPublishingPost,
            isAutosavingPost,
        } = select('core/editor');

        const isAutoSaving = isAutosavingPost();
        const isPublishing = isPublishingPost();
        const isSaving = isSavingPost();
        const postPublished = isCurrentPostPublished();

        if ((isPublishing || (postPublished && isSaving)) && !isAutoSaving && !isUpdatingTimelineBlockId) {

            const blocks = select('core/block-editor').getBlocks();
            const blockNames = Object.values(blocks).map((block) => {
                return block.name;
            });

            if (blockNames.includes('cp-timeline/content-timeline-block') && window.CtlbCPTimelineBlock.assetsLoadingMeta !== 'true') {
                isUpdatingTimelineBlockId = true;
                updateTimelineBlockId(true);
            } else if (!blockNames.includes('cp-timeline/content-timeline-block') && window.CtlbCPTimelineBlock.assetsLoadingMeta === 'true') {
                isUpdatingTimelineBlockId = true;
                updateTimelineBlockId(false);
            }
        }
    });
}
