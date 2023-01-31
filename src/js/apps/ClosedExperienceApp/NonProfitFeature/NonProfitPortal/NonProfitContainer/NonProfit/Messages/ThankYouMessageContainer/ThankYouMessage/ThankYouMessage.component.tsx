import { IFunctionComponent } from '@omaze/app';
import classNames from 'classnames';
import React, { ReactElement } from 'react';

import { nonProfitFeatureNamespace } from '../../../../../../NonProfitFeature.namespace';

import { displayName, THANK_YOU_MESSAGE_QA } from './ThankYouMessage.qa';
import styles from './ThankYouMessage.styles.css';

export interface IThankYouMessageProps {
    thankYouMessage: string;
    impactMessage: string;
    imgixUrl: string;
}

export const ThankYouMessage: IFunctionComponent<IThankYouMessageProps> = nonProfitFeatureNamespace.createComponent(
    displayName,
    (props: IThankYouMessageProps): ReactElement => {
        const { thankYouMessage, imgixUrl, impactMessage }: IThankYouMessageProps = props;

        const containerClassNames: string = classNames({
            [styles.containerWithImpact]: !!impactMessage,
        });

        const logoClassNames: string = classNames({
            [styles.logo]: true,
            [styles.logoWithoutImpactMessage]: !impactMessage,
        });

        const thankYouMessageClassNames: string = classNames({
            [styles.thankYouMessage]: true,
            [styles.thankYouMessageCWithoutImpactMessage]: !impactMessage,
        });

        function getOptimizedImage (imageUrl: string): string {
            const DEFAULT_LOGO_HEIGHT: number = 80;
            const IMAGE_FORMATTING: string = `?auto=format&fm=jpg&fit=clip&h=${DEFAULT_LOGO_HEIGHT}`;

            return `${imageUrl}${IMAGE_FORMATTING}`;
        }

        return (
            <div className={containerClassNames} data-testid={THANK_YOU_MESSAGE_QA.CONTAINER}>
                {
                    imgixUrl && (
                        <img
                            className={logoClassNames}
                            src={getOptimizedImage(imgixUrl)}
                            alt="non profit logo"
                            data-testid={THANK_YOU_MESSAGE_QA.IMGIX_URL}
                        />
                    )
                }
                <div
                    className={thankYouMessageClassNames}
                    dangerouslySetInnerHTML={{ __html: thankYouMessage }}
                    data-testid={THANK_YOU_MESSAGE_QA.MESSAGE}
                />
            </div>
        );
    }
);
