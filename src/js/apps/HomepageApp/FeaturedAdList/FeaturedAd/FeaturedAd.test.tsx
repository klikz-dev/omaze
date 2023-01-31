import { screen, render } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom/extend-expect';

import { FeaturedAd } from './FeaturedAd';

describe('Featured Ad', (): void => {
    it('renders without crashing', (): void => {
        expect((): void => {
            render(
                <FeaturedAd
                    image={{
                        src: 'src',
                        alt: 'alt',
                    }}
                    title="title"
                    subtitle="subtitle"
                    cta="cta"
                    link="link"
                    publishedAt={new Date()}
                />
            );
        }).not.toThrow();
    });

    describe('given an image, title, subtitle, CTA and link', (): void => {
        it('shows an image, title, subtitle, and CTA', (): void => {
            render(
                <FeaturedAd
                    image={{
                        sizes: {
                            '16/9': 'src',
                            '4/3': 'src',
                        },
                        alt: 'alt',
                    }}
                    title="title"
                    subtitle="subtitle"
                    cta="cta"
                    link="link"
                    publishedAt={new Date()}
                />
            );

            const imgs: HTMLElement[] = screen.queryAllByRole('img');

            imgs.forEach((img: HTMLElement): void => {
                expect(img).toBeInTheDocument();
                expect(img).toHaveAccessibleName('alt');
            });

            expect(screen.getByText('title')).toBeInTheDocument();
            expect(screen.getByText('subtitle')).toBeInTheDocument();
            expect(screen.getByRole('link', { name: 'cta' })).toBeInTheDocument();
        });

        it('image points to the "link"', (): void => {
            render(
                <FeaturedAd
                    image={{
                        sizes: {
                            '16/9': 'src',
                            '4/3': 'src',
                        },
                        alt: 'alt',
                    }}
                    title="title"
                    subtitle="subtitle"
                    cta="cta"
                    link="link"
                    publishedAt={new Date()}
                />
            );
            expect(screen.getAllByRole('img')[0].closest('a')).toHaveAttribute('href', 'link');
        });

        it('cta points to the "link"', (): void => {
            render(
                <FeaturedAd
                    image={{
                        sizes: {
                            '16/9': 'src',
                            '4/3': 'src',
                        },
                        alt: 'alt',
                    }}
                    title="title"
                    subtitle="subtitle"
                    cta="cta"
                    link="link"
                    publishedAt={new Date()}
                />
            );
            expect(screen.getByRole('link', { name: 'cta' }).closest('a')).toHaveAttribute('href', 'link');
        });
    });

    describe('given a title, subtitle, CTA, link and no image', (): void => {
        it('shows no image', (): void => {
            render(
                <FeaturedAd
                    image={{
                        alt: 'alt',
                    }}
                    title="title"
                    subtitle="subtitle"
                    cta="cta"
                    link="link"
                    publishedAt={new Date()}
                />
            );
            expect(screen.queryByRole('img')).not.toBeInTheDocument();
        });

        it('shows a title, subtitle, and CTA', (): void => {
            render(
                <FeaturedAd
                    image={{
                        alt: 'alt',
                    }}
                    title="title"
                    subtitle="subtitle"
                    cta="cta"
                    link="link"
                    publishedAt={new Date()}
                />
            );
            expect(screen.getByText('title')).toBeInTheDocument();
            expect(screen.getByText('subtitle')).toBeInTheDocument();
            expect(screen.getByRole('link', { name: 'cta' })).toBeInTheDocument();
        });
    });

    describe('given an image, title, subtitle, link and no CTA', (): void => {
        it('shows no CTA', (): void => {
            render(
                <FeaturedAd
                    image={{
                        sizes: {
                            '16/9': 'src',
                            '4/3': 'src',
                        },
                        alt: 'alt',
                    }}
                    title="title"
                    subtitle="subtitle"
                    link="link"
                    publishedAt={new Date()}
                />
            );
            expect(screen.queryByRole('button', { name: 'cta' })).not.toBeInTheDocument();
        });

        it('shows an image, title, and subtitle', (): void => {
            render(
                <FeaturedAd
                    image={{
                        sizes: {
                            '16/9': 'src',
                            '4/3': 'src',
                        },
                        alt: 'alt',
                    }}
                    title="title"
                    subtitle="subtitle"
                    link="link"
                    publishedAt={new Date()}
                />
            );
            expect(screen.getAllByRole('img')[0]).toBeInTheDocument();
            expect(screen.getAllByRole('img')[0]).toHaveAccessibleName('alt');
            expect(screen.getByText('title')).toBeInTheDocument();
            expect(screen.getByText('subtitle')).toBeInTheDocument();
        });
    });
});
