import { IGraphQLResponse } from '../useShopifyCollection/IGraphQLResponse';
import { IShopifyGetCollectionResponse } from '../useShopifyCollection/IShopifyGetCollectionResponse';

export const mockTravelCollection: IGraphQLResponse<IShopifyGetCollectionResponse> = {
    'data': {
        'collectionByHandle': {
            '__typename': 'Collection',
            'id': 'Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzE2Mzk2MDE5MzE1OQ==',
            'handle': 'travel',
            'title': 'Travel',
            'products': {
                '__typename': 'ProductConnection',
                'pageInfo': {
                    'hasNextPage': true,
                },
                'edges': [
                    {
                        '__typename': 'ProductEdge',
                        'cursor': 'random-cursor-hash-1',
                        'node': {
                            '__typename': 'Product',
                            'handle': 'lady-gaga-las-vegas-vip',
                            'id': 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzQ1MTAyNDU0NTM5NTk=',
                            'title': 'Meet Lady Gaga and Score VIP Seats to Her Vegas Residencies',
                            'tags': [
                                '$experience-active',
                                '$experience-dates-autopublish___0',
                                '$experience-dates-end___2020-01-17T07:59:00.851Z',
                                '$experience-dates-start___2019-10-08T15:22:18.099Z',
                                '$experience-dates-winner-announcement___2020-02-05T08:00:00.000Z',
                                '$oz_sweepstake_auto-publish:0',
                                '$oz_sweepstake_dates-end:2025-12-10T07:59:00.851Z',
                                '$oz_sweepstake_dates-start:2021-08-09T15:22:18.099Z',
                                '$oz_sweepstake_dates-winner-announce:2026-02-05T08:00:00.000Z',
                                '$oz_sweepstake_primary-category:entertainment',
                                '$oz_sweepstake_secondary-category:music',
                                '$oz_sweepstake_status:active',
                                'categories-Music',
                                'entertainment',
                            ],
                            'vendor': 'The Epilepsy Foundation',
                            'onlineStoreUrl': null,
                            'metafield': null,
                            'images': {
                                'edges': [
                                    {
                                        'node': {
                                            'originalSrc': 'https://cdn.shopify.com/s/files/1/0305/6363/1239/products/156892433471617914_5bf27747-1764-45b0-9989-63fd6637ec7d.jpg?v=1579137164',
                                        },
                                    },
                                ],
                            },
                        },
                    },
                    {
                        '__typename': 'ProductEdge',
                        'cursor': 'random-cursor-hash-2',
                        'node': {
                            '__typename': 'Product',
                            'handle': 'big-mouth-nick-kroll',
                            'id': 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzQ1MTAyNDI2Njg2Nzk=',
                            'title': 'Voice a Character in Big Mouth and Meet Nick Kroll',
                            'tags': [
                                '$experience-active',
                                '$experience-dates-autopublish___0',
                                '$experience-dates-end___2020-01-17T07:59:00.141Z',
                                '$experience-dates-start___2019-10-07T14:54:13.000Z',
                                '$experience-dates-winner-announcement___2020-02-05T08:00:00.000Z',
                                '$experience-featured',
                                '$oz_sweepstake_auto-publish:0',
                                '$oz_sweepstake_collection:featured',
                                '$oz_sweepstake_dates-end:2025-01-17T07:59:00.141Z',
                                '$oz_sweepstake_dates-start:2021-08-11T14:54:13.000Z',
                                '$oz_sweepstake_dates-winner-announce:2025-02-05T08:00:00.000Z',
                                '$oz_sweepstake_interest-category:comedy',
                                '$oz_sweepstake_primary-category:entertainment',
                                '$oz_sweepstake_secondary-category:tv',
                                '$oz_sweepstake_status:active',
                                'categories-Television',
                                'entertainment',
                            ],
                            'vendor': 'The Door',
                            'onlineStoreUrl': null,
                            'metafield': null,
                            'images': {
                                'edges': [
                                    {
                                        'node': {
                                            'originalSrc': 'https://cdn.shopify.com/s/files/1/0305/6363/1239/products/156997159919414794_fafda8d6-1b8a-42c4-ae67-f46bac524855.jpg?v=1579137105',
                                        },
                                    },
                                ],
                            },
                        },
                    },
                    {
                        '__typename': 'ProductEdge',
                        'cursor': 'random-cursor-hash-3',
                        'node': {
                            '__typename': 'Product',
                            'handle': '2020-toyota-supra',
                            'id': 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzQ1MTAyMzE1Mjc1NTk=',
                            'title': 'Win a 2020 Toyota Supra & Trick It Out with $50,000 Worth of Customizations',
                            'tags': [
                                '$experience-active',
                                '$experience-dates-autopublish___1',
                                '$experience-dates-end___2020-01-23T07:59:00.673Z',
                                '$experience-dates-start___2019-10-24T08:00:00.673Z',
                                '$experience-dates-winner-announcement___2020-02-05T08:00:00.000Z',
                                '$oz_sweepstake_auto-publish:1',
                                '$oz_sweepstake_dates-end:2025-01-23T07:59:00.673Z',
                                '$oz_sweepstake_dates-start:2021-08-15T08:00:00.673Z',
                                '$oz_sweepstake_dates-winner-announce:2025-02-05T08:00:00.000Z',
                                '$oz_sweepstake_status:active',
                                'categories-cars',
                            ],
                            'vendor': 'Reach Out Worldwide',
                            'onlineStoreUrl': null,
                            'metafield': null,
                            'images': {
                                'edges': [
                                    {
                                        'node': {
                                            'originalSrc': 'https://cdn.shopify.com/s/files/1/0305/6363/1239/products/157255829404418995_beb6013b-caf5-402a-b3d8-e7881d9d554a.jpg?v=1579136875',
                                        },
                                    },
                                ],
                            },
                        },
                    },
                    {
                        '__typename': 'ProductEdge',
                        'cursor': 'random-cursor-hash-4',
                        'node': {
                            '__typename': 'Product',
                            'handle': 'super-bowl-liv-miami',
                            'id': 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzQ1MTAyMzAxMTg1MzU=',
                            'title': 'Win All-Access Passes to Super Bowl LIV & Meet Larry Fitzgerald on the Field',
                            'tags': [
                                '$experience-active',
                                '$experience-dates-autopublish___1',
                                '$experience-dates-end___2020-01-21T07:59:00.147Z',
                                '$experience-dates-start___2019-10-21T08:00:00.147Z',
                                '$experience-dates-winner-announcement___2020-01-31T08:00:00.000Z',
                                '$oz_sweepstake_auto-publish:1',
                                '$oz_sweepstake_dates-end:2020-01-21T07:59:00.147Z',
                                '$oz_sweepstake_dates-start:2019-10-21T08:00:00.147Z',
                                '$oz_sweepstake_dates-winner-announce:2020-01-31T08:00:00.000Z',
                                '$oz_sweepstake_primary-category:sports',
                                '$oz_sweepstake_status:active',
                                'categories-sports',
                                'entertainment',
                            ],
                            'vendor': 'United Way',
                            'onlineStoreUrl': null,
                            'metafield': null,
                            'images': {
                                'edges': [
                                    {
                                        'node': {
                                            'originalSrc': 'https://cdn.shopify.com/s/files/1/0305/6363/1239/products/157056267786616529_0ffeeec3-b1e2-4ee2-827d-fd10dce13401.jpg?v=1579136846',
                                        },
                                    },
                                ],
                            },
                        },
                    },
                    {
                        '__typename': 'ProductEdge',
                        'cursor': 'random-cursor-hash-5',
                        'node': {
                            '__typename': 'Product',
                            'handle': '100k-financial-freedom',
                            'id': 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzQ1MTAyMjA4MTI0MjM=',
                            'title': 'Win $100,000 to Change Your Life',
                            'tags': [
                                '$experience-active',
                                '$experience-dates-autopublish___0',
                                '$experience-dates-end___2020-01-23T07:59:00.067Z',
                                '$experience-dates-start___2019-10-24T16:52:13.619Z',
                                '$experience-dates-winner-announcement___2020-02-05T08:00:00.000Z',
                                '$experience-featured',
                                '$oz_sweepstake_auto-publish:0',
                                '$oz_sweepstake_collection:featured',
                                '$oz_sweepstake_dates-end:2020-01-23T07:59:00.067Z',
                                '$oz_sweepstake_dates-start:2019-10-24T16:52:13.619Z',
                                '$oz_sweepstake_dates-winner-announce:2020-02-05T08:00:00.000Z',
                                '$oz_sweepstake_status:active',
                                'categories-Travel',
                                'entertainment',
                            ],
                            'vendor': 'GivePower',
                            'onlineStoreUrl': null,
                            'metafield': null,
                            'images': {
                                'edges': [
                                    {
                                        'node': {
                                            'originalSrc': 'https://cdn.shopify.com/s/files/1/0305/6363/1239/products/157116681435218213_3078c21d-6bdf-4250-8a70-b5b3c8d0cf21.jpg?v=1579136664',
                                        },
                                    },
                                ],
                            },
                        },
                    },
                    {
                        '__typename': 'ProductEdge',
                        'cursor': 'random-cursor-hash-6',
                        'node': {
                            '__typename': 'Product',
                            'handle': '20k-dream-gaming-rig',
                            'id': 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzQ1MTAyMTM3NjczMDM=',
                            'title': 'Win $20,000 to Create the Ultimate Gaming Rig for You and Your Squad',
                            'tags': [
                                '$experience-active',
                                '$experience-dates-autopublish___0',
                                '$experience-dates-end___2020-01-16T07:59:00.119Z',
                                '$experience-dates-start___2019-10-23T19:57:36.045Z',
                                '$experience-dates-winner-announcement___2020-01-29T08:00:00.000Z',
                                '$oz_sweepstake_auto-publish:0',
                                '$oz_sweepstake_dates-end:2020-01-16T07:59:00.119Z',
                                '$oz_sweepstake_dates-start:2019-10-23T19:57:36.045Z',
                                '$oz_sweepstake_dates-winner-announce:2020-01-29T08:00:00.000Z',
                                '$oz_sweepstake_status:active',
                                'categories-Sports',
                                'entertainment',
                            ],
                            'vendor': 'Gamers Outreach',
                            'onlineStoreUrl': null,
                            'metafield': null,
                            'images': {
                                'edges': [
                                    {
                                        'node': {
                                            'originalSrc': 'https://cdn.shopify.com/s/files/1/0305/6363/1239/products/157177483327818338.jpg?v=1579136531',
                                        },
                                    },
                                ],
                            },
                        },
                    },
                    {
                        '__typename': 'ProductEdge',
                        'cursor': 'random-cursor-hash-7',
                        'node': {
                            '__typename': 'Product',
                            'handle': '2020-jeep-gladiator-rubicon',
                            'id': 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzQ1MTAyMTI0ODkzNTE=',
                            'title': 'Win a 2020 Jeep Gladiator Rubicon 4x4 and $20,000',
                            'tags': [
                                '$experience-active',
                                '$experience-dates-autopublish___0',
                                '$experience-dates-end___2020-01-28T07:59:00.933Z',
                                '$experience-dates-start___2019-10-29T15:56:12.227Z',
                                '$experience-dates-winner-announcement___2020-02-12T08:00:00.000Z',
                                '$oz_sweepstake_auto-publish:0',
                                '$oz_sweepstake_dates-end:2020-01-28T07:59:00.933Z',
                                '$oz_sweepstake_dates-start:2019-10-29T15:56:12.227Z',
                                '$oz_sweepstake_dates-winner-announce:2020-02-12T08:00:00.000Z',
                                '$oz_sweepstake_feature:image-carousel',
                                '$oz_sweepstake_status:active',
                                'categories-cars',
                            ],
                            'vendor': 'Team Rubicon',
                            'onlineStoreUrl': null,
                            'metafield': null,
                            'images': {
                                'edges': [
                                    {
                                        'node': {
                                            'originalSrc': 'https://cdn.shopify.com/s/files/1/0305/6363/1239/products/157420213108210112.jpg?v=1579136507',
                                        },
                                    },
                                ],
                            },
                        },
                    },
                    {
                        '__typename': 'ProductEdge',
                        'cursor': 'random-cursor-hash-8',
                        'node': {
                            '__typename': 'Product',
                            'handle': 'jay-and-silent-bob',
                            'id': 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzQ1MTAyMDY3MjIxODM=',
                            'title': 'Hang with Jay and Silent Bob’s Shannon Elizabeth, Kevin Smith & Jason Mewes',
                            'tags': [
                                '$experience-active',
                                '$experience-dates-autopublish___1',
                                '$experience-dates-end___2020-01-17T07:59:00.204Z',
                                '$experience-dates-start___2019-11-06T16:00:00.204Z',
                                '$experience-dates-winner-announcement___2020-02-05T08:00:00.000Z',
                                '$oz_sweepstake_auto-publish:1',
                                '$oz_sweepstake_dates-end:2020-01-17T07:59:00.204Z',
                                '$oz_sweepstake_dates-start:2019-11-06T16:00:00.204Z',
                                '$oz_sweepstake_dates-winner-announce:2020-02-05T08:00:00.000Z',
                                '$oz_sweepstake_status:active',
                                'categories-Movies',
                                'entertainment',
                            ],
                            'vendor': 'the Shannon Elizabeth Foundation',
                            'onlineStoreUrl': null,
                            'metafield': null,
                            'images': {
                                'edges': [
                                    {
                                        'node': {
                                            'originalSrc': 'https://cdn.shopify.com/s/files/1/0305/6363/1239/products/157195484806415195.jpg?v=1579136385',
                                        },
                                    },
                                ],
                            },
                        },
                    },
                    {
                        '__typename': 'ProductEdge',
                        'cursor': 'random-cursor-hash-9',
                        'node': {
                            '__typename': 'Product',
                            'handle': 'jaguar-i-pace-se-20k',
                            'id': 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzQ1MTAyMDU1MDk3Njc=',
                            'title': 'Win a 2020 Jaguar I-PACE and $20,000',
                            'tags': [
                                '$experience-active',
                                '$experience-dates-autopublish___1',
                                '$experience-dates-end___2020-02-11T07:59:00.769Z',
                                '$experience-dates-start___2019-11-12T20:00:00.769Z',
                                '$experience-dates-winner-announcement___2020-02-26T08:00:00.000Z',
                                '$oz_sweepstake_auto-publish:1',
                                '$oz_sweepstake_dates-end:2020-02-11T07:59:00.769Z',
                                '$oz_sweepstake_dates-start:2019-11-12T20:00:00.769Z',
                                '$oz_sweepstake_dates-winner-announce:2020-02-26T08:00:00.000Z',
                                '$oz_sweepstake_feature:image-carousel',
                                '$oz_sweepstake_status:active',
                                'categories-Cars',
                            ],
                            'vendor': 'GameChanger Charity',
                            'onlineStoreUrl': null,
                            'metafield': null,
                            'images': {
                                'edges': [
                                    {
                                        'node': {
                                            'originalSrc': 'https://cdn.shopify.com/s/files/1/0305/6363/1239/products/157317293753618712.jpg?v=1579136356',
                                        },
                                    },
                                ],
                            },
                        },
                    },
                    {
                        '__typename': 'ProductEdge',
                        'cursor': 'random-cursor-hash-10',
                        'node': {
                            '__typename': 'Product',
                            'handle': 'heli-ski-canada',
                            'id': 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzQ1MTAyMDQ0OTM5NTk=',
                            'title': 'Experience the World’s Best Heli-Skiing in British Columbia',
                            'tags': [
                                '$experience-active',
                                '$experience-dates-autopublish___0',
                                '$experience-dates-end___2020-01-29T07:59:00.488Z',
                                '$experience-dates-start___2019-11-21T16:22:43.758Z',
                                '$experience-dates-winner-announcement___2020-02-12T08:00:00.000Z',
                                '$oz_sweepstake_auto-publish:0',
                                '$oz_sweepstake_dates-end:2020-01-29T07:59:00.488Z',
                                '$oz_sweepstake_dates-start:2019-11-21T16:22:43.758Z',
                                '$oz_sweepstake_dates-winner-announce:2020-02-12T08:00:00.000Z',
                                '$oz_sweepstake_status:active',
                                'categories-Travel',
                            ],
                            'vendor': 'The Avalanche Canada Foundation',
                            'onlineStoreUrl': null,
                            'metafield': null,
                            'images': {
                                'edges': [
                                    {
                                        'node': {
                                            'originalSrc': 'https://cdn.shopify.com/s/files/1/0305/6363/1239/products/157419535865919193.jpg?v=1579136335',
                                        },
                                    },
                                ],
                            },
                        },
                    },
                ],
            },
        },
    },
};

export const mockTravelCollectionPage2: IGraphQLResponse<IShopifyGetCollectionResponse> = {
    'data': {
        'collectionByHandle': {
            '__typename': 'Collection',
            'id': 'Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzE2Mzk2MDE5MzE1OQ==',
            'handle': 'travel',
            'title': 'Travel',
            'products': {
                '__typename': 'ProductConnection',
                'pageInfo': {
                    'hasNextPage': true,
                },
                'edges': [
                    {
                        '__typename': 'ProductEdge',
                        'cursor': 'eyJsYXN0X2lkIjo0NTEwMjAwNDYzNDk1LCJsYXN0X3ZhbHVlIjoiMCJ9',
                        'node': {
                            '__typename': 'Product',
                            'handle': '1968-ford-mustang-gt-fastback-bullitt',
                            'id': 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzQ1MTAyMDA0NjM0OTU=',
                            'title': 'Win a Restored 1968 “Bullitt” Ford® Mustang GT Fastback',
                            'tags': [
                                '$experience-active',
                                '$experience-dates-autopublish___0',
                                '$experience-dates-end___2020-02-07T07:59:00.451Z',
                                '$experience-dates-start___2019-11-05T15:33:52.169Z',
                                '$experience-dates-winner-announcement___2020-02-26T08:00:00.000Z',
                                '$experience-featured',
                                '$oz_sweepstake_auto-publish:0',
                                '$oz_sweepstake_collection:featured',
                                '$oz_sweepstake_dates-end:2020-02-07T07:59:00.451Z',
                                '$oz_sweepstake_dates-start:2019-11-05T15:33:52.169Z',
                                '$oz_sweepstake_dates-winner-announce:2020-02-26T08:00:00.000Z',
                                '$oz_sweepstake_feature:image-carousel',
                                '$oz_sweepstake_status:active',
                                'categories-Cars',
                            ],
                            'vendor': 'Gas Monkey Foundation',
                            'onlineStoreUrl': null,
                            'images': {
                                'edges': [
                                    {
                                        'node': {
                                            'originalSrc': 'https://cdn.shopify.com/s/files/1/0305/6363/1239/products/157902578449210318.jpg?v=1579136249',
                                        },
                                    },
                                ],
                            },
                            'metafield': null,
                        },
                    },
                    {
                        '__typename': 'ProductEdge',
                        'cursor': 'eyJsYXN0X2lkIjo0NTEwMTk5MzQ5MzgzLCJsYXN0X3ZhbHVlIjoiMCJ9',
                        'node': {
                            '__typename': 'Product',
                            'handle': 'rome-italy-food-trip',
                            'id': 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzQ1MTAxOTkzNDkzODM=',
                            'title': 'Win a Mouthwatering Trip to Rome and Visit Giada De Laurentiis’ Favorite Spots',
                            'tags': [
                                '$experience-active',
                                '$experience-dates-autopublish___1',
                                '$experience-dates-end___2020-01-22T07:59:00.451Z',
                                '$experience-dates-start___2019-11-05T16:00:00.451Z',
                                '$experience-dates-winner-announcement___2020-02-05T08:00:00.000Z',
                                '$oz_sweepstake_auto-publish:1',
                                '$oz_sweepstake_dates-end:2020-01-22T07:59:00.451Z',
                                '$oz_sweepstake_dates-start:2019-11-05T16:00:00.451Z',
                                '$oz_sweepstake_dates-winner-announce:2020-02-05T08:00:00.000Z',
                                '$oz_sweepstake_status:active',
                                'categories-Culinary',
                                'categories-Travel',
                            ],
                            'vendor': 'Safe Place for Youth',
                            'onlineStoreUrl': null,
                            'images': {
                                'edges': [
                                    {
                                        'node': {
                                            'originalSrc': 'https://cdn.shopify.com/s/files/1/0305/6363/1239/products/157239429573215290_715f2767-cdd4-4eea-87bf-a54be4c797c7.jpg?v=1579136229',
                                        },
                                    },
                                ],
                            },
                            'metafield': null,
                        },
                    },
                    {
                        '__typename': 'ProductEdge',
                        'cursor': 'eyJsYXN0X2lkIjo0NTEwMTk4Mzk5MTExLCJsYXN0X3ZhbHVlIjoiMCJ9',
                        'node': {
                            '__typename': 'Product',
                            'handle': 'finland-igloo-hotel',
                            'id': 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzQ1MTAxOTgzOTkxMTE=',
                            'title': 'Stay in an Igloo Hotel in Finland for a Chance to See the Northern Lights',
                            'tags': [
                                '$experience-active',
                                '$experience-dates-autopublish___1',
                                '$experience-dates-end___2020-01-21T07:59:00.777Z',
                                '$experience-dates-start___2019-11-07T09:00:00.777Z',
                                '$experience-dates-winner-announcement___2020-02-05T08:00:00.000Z',
                                '$oz_sweepstake_auto-publish:1',
                                '$oz_sweepstake_dates-end:2020-01-21T07:59:00.777Z',
                                '$oz_sweepstake_dates-start:2019-11-07T09:00:00.777Z',
                                '$oz_sweepstake_dates-winner-announce:2020-02-05T08:00:00.000Z',
                                '$oz_sweepstake_status:active',
                                'categories-Travel',
                            ],
                            'vendor': 'Protect Our Winters',
                            'onlineStoreUrl': null,
                            'images': {
                                'edges': [
                                    {
                                        'node': {
                                            'originalSrc': 'https://cdn.shopify.com/s/files/1/0305/6363/1239/products/157248503876116995_f61a861c-75c9-433c-bc22-b54ebec6c893.jpg?v=1579136202',
                                        },
                                    },
                                ],
                            },
                            'metafield': null,
                        },
                    },
                    {
                        '__typename': 'ProductEdge',
                        'cursor': 'eyJsYXN0X2lkIjo0NTEwMTk2MzY3NDk1LCJsYXN0X3ZhbHVlIjoiMCJ9',
                        'node': {
                            '__typename': 'Product',
                            'handle': 'call-of-duty-modern-warfare',
                            'id': 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzQ1MTAxOTYzNjc0OTU=',
                            'title': 'Play Call of Duty®: Modern Warfare® with Dr Disrespect and Klay Thompson',
                            'tags': [
                                '$experience-active',
                                '$experience-dates-autopublish___0',
                                '$experience-dates-end___2020-01-21T07:59:00.559Z',
                                '$experience-dates-start___2019-11-07T15:29:25.279Z',
                                '$experience-dates-winner-announcement___2020-02-05T08:00:00.000Z',
                                '$oz_sweepstake_auto-publish:0',
                                '$oz_sweepstake_dates-end:2020-01-21T07:59:00.559Z',
                                '$oz_sweepstake_dates-start:2019-11-07T15:29:25.279Z',
                                '$oz_sweepstake_dates-winner-announce:2020-02-05T08:00:00.000Z',
                                '$oz_sweepstake_status:active',
                                'categories-Influencer',
                                'categories-Sports',
                                'entertainment',
                            ],
                            'vendor': 'Call of Duty Endowment',
                            'onlineStoreUrl': null,
                            'images': {
                                'edges': [
                                    {
                                        'node': {
                                            'originalSrc': 'https://cdn.shopify.com/s/files/1/0305/6363/1239/products/157298626066812025_29674a0e-dc65-48dc-a1f5-489b49a5e5fb.jpg?v=1579136165',
                                        },
                                    },
                                ],
                            },
                            'metafield': null,
                        },
                    },
                    {
                        '__typename': 'ProductEdge',
                        'cursor': 'eyJsYXN0X2lkIjo0NTEwMTkwNzY0MTY3LCJsYXN0X3ZhbHVlIjoiMCJ9',
                        'node': {
                            '__typename': 'Product',
                            'handle': '2019-alfa-romeo-stelvio-quadrifoglio-nring-20k',
                            'id': 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzQ1MTAxOTA3NjQxNjc=',
                            'title': 'Win a Rare Alfa Romeo Stelvio Quadrifoglio NRING and $20,000',
                            'tags': [
                                '$experience-active',
                                '$experience-dates-autopublish___1',
                                '$experience-dates-end___2020-02-13T07:59:00.147Z',
                                '$experience-dates-start___2019-11-14T14:00:00.147Z',
                                '$experience-dates-winner-announcement___2020-02-26T08:00:00.000Z',
                                '$oz_sweepstake_auto-publish:1',
                                '$oz_sweepstake_dates-end:2020-02-13T07:59:00.147Z',
                                '$oz_sweepstake_dates-start:2019-11-14T14:00:00.147Z',
                                '$oz_sweepstake_dates-winner-announce:2020-02-26T08:00:00.000Z',
                                '$oz_sweepstake_feature:image-carousel',
                                '$oz_sweepstake_status:active',
                                'categories-Cars',
                            ],
                            'vendor': 'PATH',
                            'onlineStoreUrl': null,
                            'images': {
                                'edges': [
                                    {
                                        'node': {
                                            'originalSrc': 'https://cdn.shopify.com/s/files/1/0305/6363/1239/products/157325517767715846_04546b51-6aa0-4d53-b66d-2b306878ef90.jpg?v=1579136045',
                                        },
                                    },
                                ],
                            },
                            'metafield': null,
                        },
                    },
                    {
                        '__typename': 'ProductEdge',
                        'cursor': 'eyJsYXN0X2lkIjo0NTEwMTg5OTc3NzM1LCJsYXN0X3ZhbHVlIjoiMCJ9',
                        'node': {
                            '__typename': 'Product',
                            'handle': 'trevor-noah-daily-show-writers-room',
                            'id': 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzQ1MTAxODk5Nzc3MzU=',
                            'title': 'Be Interviewed by Trevor Noah and Go Behind the Scenes of The Daily Show',
                            'tags': [
                                '$experience-active',
                                '$experience-dates-autopublish___1',
                                '$experience-dates-end___2020-02-12T07:59:00.192Z',
                                '$experience-dates-start___2019-12-05T15:50:48.522Z',
                                '$experience-dates-winner-announcement___2020-02-26T08:00:00.000Z',
                                '$oz_sweepstake_auto-publish:1',
                                '$oz_sweepstake_dates-end:2020-02-12T07:59:00.192Z',
                                '$oz_sweepstake_dates-start:2019-12-05T15:50:48.522Z',
                                '$oz_sweepstake_dates-winner-announce:2020-02-26T08:00:00.000Z',
                                '$oz_sweepstake_status:active',
                                'categories-Television',
                                'entertainment',
                            ],
                            'vendor': 'The Trevor Noah Foundation',
                            'onlineStoreUrl': null,
                            'images': {
                                'edges': [
                                    {
                                        'node': {
                                            'originalSrc': 'https://cdn.shopify.com/s/files/1/0305/6363/1239/products/157324493731618299.jpg?v=1579136027',
                                        },
                                    },
                                ],
                            },
                            'metafield': null,
                        },
                    },
                    {
                        '__typename': 'ProductEdge',
                        'cursor': 'eyJsYXN0X2lkIjo0NTEwMTg5MDYwMjMxLCJsYXN0X3ZhbHVlIjoiMCJ9',
                        'node': {
                            '__typename': 'Product',
                            'handle': 'japan-sakura-festival',
                            'id': 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzQ1MTAxODkwNjAyMzE=',
                            'title': 'Win a Trip to Experience Japan’s Cherry Blossom Season',
                            'tags': [
                                '$experience-active',
                                '$experience-dates-autopublish___0',
                                '$experience-dates-end___2020-01-24T07:59:00.711Z',
                                '$experience-dates-start___2019-11-18T18:46:16.063Z',
                                '$experience-dates-winner-announcement___2020-02-12T08:00:00.000Z',
                                '$oz_sweepstake_auto-publish:0',
                                '$oz_sweepstake_dates-end:2020-01-24T07:59:00.711Z',
                                '$oz_sweepstake_dates-start:2019-11-18T18:46:16.063Z',
                                '$oz_sweepstake_dates-winner-announce:2020-02-12T08:00:00.000Z',
                                '$oz_sweepstake_status:active',
                                'categories-Travel',
                            ],
                            'vendor': 'PATH',
                            'onlineStoreUrl': null,
                            'images': {
                                'edges': [
                                    {
                                        'node': {
                                            'originalSrc': 'https://cdn.shopify.com/s/files/1/0305/6363/1239/products/157351645461516877.jpg?v=1579136001',
                                        },
                                    },
                                ],
                            },
                            'metafield': null,
                        },
                    },
                    {
                        '__typename': 'ProductEdge',
                        'cursor': 'eyJsYXN0X2lkIjo0NTEwMTg4MTQyNzI3LCJsYXN0X3ZhbHVlIjoiMCJ9',
                        'node': {
                            '__typename': 'Product',
                            'handle': 'rihanna-fenty-beauty',
                            'id': 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzQ1MTAxODgxNDI3Mjc=',
                            'title': 'Meet Rihanna and Be Her VIP Guest at a Fenty Beauty Event',
                            'tags': [
                                '$experience-active',
                                '$experience-dates-autopublish___0',
                                '$experience-dates-end___2020-02-14T07:59:00.406Z',
                                '$experience-dates-start___2019-12-12T16:02:34.154Z',
                                '$experience-dates-winner-announcement___2020-03-04T08:00:00.000Z',
                                '$oz_sweepstake_auto-publish:0',
                                '$oz_sweepstake_dates-end:2020-02-14T07:59:00.406Z',
                                '$oz_sweepstake_dates-start:2019-12-12T16:02:34.154Z',
                                '$oz_sweepstake_dates-winner-announce:2020-03-04T08:00:00.000Z',
                                '$oz_sweepstake_status:active',
                                'categories-Fashion',
                                'entertainment',
                            ],
                            'vendor': 'The Clara Lionel Foundation',
                            'onlineStoreUrl': null,
                            'images': {
                                'edges': [
                                    {
                                        'node': {
                                            'originalSrc': 'https://cdn.shopify.com/s/files/1/0305/6363/1239/products/157358381752214688.jpg?v=1579135982',
                                        },
                                    },
                                ],
                            },
                            'metafield': null,
                        },
                    },
                    {
                        '__typename': 'ProductEdge',
                        'cursor': 'eyJsYXN0X2lkIjo0NTEwMTg2OTYzMDc5LCJsYXN0X3ZhbHVlIjoiMCJ9',
                        'node': {
                            '__typename': 'Product',
                            'handle': 'andrea-bocelli-villa-dinner-show',
                            'id': 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzQ1MTAxODY5NjMwNzk=',
                            'title': 'Win a Trip to Italy to Meet Andrea Bocelli for Drinks and a Private Show',
                            'tags': [
                                '$experience-active',
                                '$experience-dates-autopublish___0',
                                '$experience-dates-end___2020-02-08T07:59:00.442Z',
                                '$experience-dates-experience-date___2020-04-06T07:00:00.000Z',
                                '$experience-dates-start___2019-11-19T17:05:48.560Z',
                                '$experience-dates-winner-announcement___2020-02-26T08:00:00.000Z',
                                '$oz_sweepstake_auto-publish:0',
                                '$oz_sweepstake_dates-end:2020-02-08T07:59:00.442Z',
                                '$oz_sweepstake_dates-experience-date:2020-04-06T07:00:00.000Z',
                                '$oz_sweepstake_dates-start:2019-11-19T17:05:48.560Z',
                                '$oz_sweepstake_dates-winner-announce:2020-02-26T08:00:00.000Z',
                                '$oz_sweepstake_status:active',
                                'categories-Music',
                                'categories-Travel',
                                'entertainment',
                            ],
                            'vendor': 'Andrea Bocelli Foundation',
                            'onlineStoreUrl': null,
                            'images': {
                                'edges': [
                                    {
                                        'node': {
                                            'originalSrc': 'https://cdn.shopify.com/s/files/1/0305/6363/1239/products/157384259817613355_058099ce-6a81-4dce-b5fc-ec0a73a53011.jpg?v=1579135959',
                                        },
                                    },
                                ],
                            },
                            'metafield': null,
                        },
                    },
                    {
                        '__typename': 'ProductEdge',
                        'cursor': 'eyJsYXN0X2lkIjo0NTEwMTg1OTgwMDM5LCJsYXN0X3ZhbHVlIjoiMCJ9',
                        'node': {
                            '__typename': 'Product',
                            'handle': 'custom-land-rover-defender',
                            'id': 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzQ1MTAxODU5ODAwMzk=',
                            'title': 'Win a Customized Land Rover Defender and $20,000',
                            'tags': [
                                '$experience-active',
                                '$experience-dates-autopublish___0',
                                '$experience-dates-end___2020-02-21T07:59:00.577Z',
                                '$experience-dates-start___2019-11-21T14:40:41.532Z',
                                '$experience-dates-winner-announcement___2020-03-11T07:00:00.000Z',
                                '$experience-featured',
                                '$oz_sweepstake_auto-publish:0',
                                '$oz_sweepstake_collection:featured',
                                '$oz_sweepstake_dates-end:2020-02-21T07:59:00.577Z',
                                '$oz_sweepstake_dates-start:2019-11-21T14:40:41.532Z',
                                '$oz_sweepstake_dates-winner-announce:2020-03-11T07:00:00.000Z',
                                '$oz_sweepstake_feature:image-carousel',
                                '$oz_sweepstake_status:active',
                                'categories-Cars',
                            ],
                            'vendor': 'National Geographic Society',
                            'onlineStoreUrl': null,
                            'images': {
                                'edges': [
                                    {
                                        'node': {
                                            'originalSrc': 'https://cdn.shopify.com/s/files/1/0305/6363/1239/products/157444776357713413.jpg?v=1579135937',
                                        },
                                    },
                                ],
                            },
                            'metafield': null,
                        },
                    },
                ],
            },
        },
    },
};
