const currentDate = new Date();
const yesterday = new Date(currentDate.getTime() - 86400000);
const tomorrow = new Date(currentDate.getTime() + 86400000);
export default {
    listName: 'Contextual Email Capture',
    contextualEmailSessionCookieName: 'CONTEXTUAL_EMAIL_SESSION_COOKIE',
    cookieExpirationInDays: 30,
    templates: [
        {
            templateId: 1,
            timeDelayInSeconds: 3,
            intro: {
                title: 'Would you rather...',
                message: 'Spend your weekend',
            },
            tag: 'Entertainment',
            sweepstakeTagType: '$oz_sweepstake_primary-category',
            targetPage: 'Product',
            sweepstakeState: 'active',
            startDate: yesterday, //YYYY-MM-DD
            endDate: tomorrow, //YYYY-MM-DD
            options: [
                {
                    optionId: 1,
                    image: {
                        src: 'https://cdn.shopify.com/s/files/1/0190/4744/8676/products/157896207899917647_5264b76f-75d9-41cb-ae4b-3012b035abe8.png?v=1581007421',
                        alt: '',
                        caption: 'Catching a flight to a new city',
                    },
                    formTitle: 'Get out of town!',
                    formMessage: 'We’ll take you there',
                    ctaLabel: 'Let\'s do this!',
                    successTitle: 'You’re in!',
                    successMessage: 'Check your inbox and take flight.',
                    listName: 'TravelList',
                    legalCopy: 'By completing this form you\'re signing up to receive our financial freedom emails. No pressure — you can unsubscribe at any time',
                    legalUrl: '//www.google.com',
                },
                {
                    optionId: 2,
                    image: {
                        src: 'https://cdn.shopify.com/s/files/1/0065/5130/6303/products/157981347609615716_1049x.png?v=1579813495',
                        alt: '',
                        caption: 'Decorating your bedroom',
                    },
                    formTitle: 'Home is where the heart is!',
                    formMessage: 'Find out how to make house goals a reality',
                    ctaLabel: 'Let\'s do this!',
                    successTitle: 'You’re in!',
                    successMessage: 'Check your inbox for your #demoday.',
                    listName: 'HouseList',
                    legalCopy: 'By completing this form you\'re signing up to receive our financial freedom emails. No pressure — you can unsubscribe at any time',
                    legalUrl: '//www.google.com',
                },
            ],
        },
        {
            templateId: 2,
            timeDelayInSeconds: 3,
            intro: {
                title: 'Would you rather...',
                message: 'Spend your weekend',
            },
            tag: 'Entertainment',
            sweepstakeTagType: '$oz_sweepstake_primary-category',
            targetPage: 'Product',
            sweepstakeState: 'active',
            startDate: yesterday, //YYYY-MM-DD
            endDate: tomorrow, //YYYY-MM-DD
            options: [
                {
                    optionId: 1,
                    image: {
                        src: 'https://cdn.shopify.com/s/files/1/0190/4744/8676/products/157896207899917647_5264b76f-75d9-41cb-ae4b-3012b035abe8.png?v=1581007421',
                        alt: '',
                        caption: 'Catching a flight to a new city part 2',
                    },
                    formTitle: 'Get out of town! part 2',
                    formMessage: 'We’ll take you there part 2',
                    ctaLabel: 'Let\'s do this!',
                    successTitle: 'You’re in! part 2',
                    successMessage: 'Check your inbox and take flight. part 2',
                    listName: 'TravelList',
                    legalCopy: 'By completing this form you\'re signing up to receive our financial freedom emails. No pressure — you can unsubscribe at any time',
                    legalUrl: '//www.google.com',
                },
                {
                    optionId: 2,
                    image: {
                        src: 'https://cdn.shopify.com/s/files/1/0065/5130/6303/products/157981347609615716_1049x.png?v=1579813495',
                        alt: '',
                        caption: 'Decorating your bedroom part 2',
                    },
                    formTitle: 'Home is where the heart is! part 2',
                    formMessage: 'Find out how to make house goals a reality part 2',
                    ctaLabel: 'Let\'s do this!',
                    successTitle: 'You’re in! part 2',
                    successMessage: 'Check your inbox for your #demoday. part 2',
                    listName: 'HouseList',
                    legalCopy: 'By completing this form you\'re signing up to receive our financial freedom emails. No pressure — you can unsubscribe at any time',
                    legalUrl: '//www.google.com',
                },
            ],
        },
        {
            templateId: 3,
            timeDelayInSeconds: 3,
            intro: {
                title: 'Would you rather...',
                message: 'Spend your weekend',
            },
            tag: 'Cars',
            sweepstakeTagType: '$oz_sweepstake_primary-category',
            targetPage: 'Product',
            sweepstakeState: 'active',
            startDate: '2019-02-14', //YYYY-MM-DD
            endDate: '2019-03-31', //YYYY-MM-DD
            options: [
                {
                    optionId: 1,
                    image: {
                        src: 'https://cdn.shopify.com/s/files/1/0190/4744/8676/products/157896207899917647_5264b76f-75d9-41cb-ae4b-3012b035abe8.png?v=1581007421',
                        alt: '',
                        caption: 'Catching a flight to a new city part 3',
                    },
                    formTitle: 'Get out of town! part 3',
                    formMessage: 'We’ll take you there part 3',
                    ctaLabel: 'Let\'s do this!',
                    successTitle: 'You’re in! part 3',
                    successMessage: 'Check your inbox and take flight. part 3',
                    listName: 'TravelList',
                    legalCopy: 'By completing this form you\'re signing up to receive our financial freedom emails. No pressure — you can unsubscribe at any time',
                    legalUrl: '//www.google.com',
                },
                {
                    optionId: 2,
                    image: {
                        src: 'https://cdn.shopify.com/s/files/1/0065/5130/6303/products/157981347609615716_1049x.png?v=1579813495',
                        alt: '',
                        caption: 'Decorating your bedroom part 3',
                    },
                    formTitle: 'Home is where the heart is! part 3',
                    formMessage: 'Find out how to make house goals a reality part 3',
                    ctaLabel: 'Let\'s do this!',
                    successTitle: 'You’re in! part 3',
                    successMessage: 'Check your inbox for your #demoday. part 3',
                    listName: 'HouseList',
                    legalCopy: 'By completing this form you\'re signing up to receive our financial freedom emails. No pressure — you can unsubscribe at any time',
                    legalUrl: '//www.google.com',
                },
            ],
        },
        {
            templateId: 4,
            timeDelayInSeconds: 3,
            intro: {
                title: 'Would you rather... Thanks',
                message: 'Spend your weekend',
            },
            tag: 'Entertainment',
            sweepstakeTagType: '$oz_sweepstake_primary-category',
            targetPage: 'Thank You',
            sweepstakeState: 'active',
            startDate: '2020-01-28', //YYYY-MM-DD
            endDate: '2020-03-31', //YYYY-MM-DD
            options: [
                {
                    optionId: 1,
                    image: {
                        src: 'https://cdn.shopify.com/s/files/1/0190/4744/8676/products/157896207899917647_5264b76f-75d9-41cb-ae4b-3012b035abe8.png?v=1581007421',
                        alt: '',
                        caption: 'Catching a flight to a new city part 3',
                    },
                    formTitle: 'Get out of town! part 3',
                    formMessage: 'We’ll take you there part 3',
                    ctaLabel: 'Let\'s do this!',
                    successTitle: 'You’re in! part 3',
                    successMessage: 'Check your inbox and take flight. part 3',
                    listName: 'TravelList',
                    legalCopy: 'By completing this form you\'re signing up to receive our financial freedom emails. No pressure — you can unsubscribe at any time',
                    legalUrl: '//www.google.com',
                },
                {
                    optionId: 2,
                    image: {
                        src: 'https://cdn.shopify.com/s/files/1/0065/5130/6303/products/157981347609615716_1049x.png?v=1579813495',
                        alt: '',
                        caption: 'Decorating your bedroom part 3',
                    },
                    formTitle: 'Home is where the heart is! part 3',
                    formMessage: 'Find out how to make house goals a reality part 3',
                    ctaLabel: 'Let\'s do this!',
                    successTitle: 'You’re in! part 3',
                    successMessage: 'Check your inbox for your #demoday. part 3',
                    listName: 'HouseList',
                    legalCopy: 'By completing this form you\'re signing up to receive our financial freedom emails. No pressure — you can unsubscribe at any time',
                    legalUrl: '//www.google.com',
                },
            ],
        },
        {
            templateId: 5,
            timeDelayInSeconds: 3,
            intro: {
                title: 'Would you rather... Thanks Page 2',
                message: 'Spend your weekend',
            },
            tag: 'Cars',
            sweepstakeTagType: '$oz_sweepstake_primary-category',
            targetPage: 'Thank You',
            sweepstakeState: 'active',
            startDate: '2020-01-28', //YYYY-MM-DD
            endDate: '2020-03-31', //YYYY-MM-DD
            options: [
                {
                    optionId: 1,
                    image: {
                        src: 'https://cdn.shopify.com/s/files/1/0190/4744/8676/products/157896207899917647_5264b76f-75d9-41cb-ae4b-3012b035abe8.png?v=1581007421',
                        alt: '',
                        caption: 'Catching a flight to a new city part 3',
                    },
                    formTitle: 'Get out of town! part 3',
                    formMessage: 'We’ll take you there part 3',
                    ctaLabel: 'Let\'s do this!',
                    successTitle: 'You’re in! part 3',
                    successMessage: 'Check your inbox and take flight. part 3',
                    listName: 'TravelList',
                    legalCopy: 'By completing this form you\'re signing up to receive our financial freedom emails. No pressure — you can unsubscribe at any time',
                    legalUrl: '//www.google.com',
                },
                {
                    optionId: 2,
                    image: {
                        src: 'https://cdn.shopify.com/s/files/1/0065/5130/6303/products/157981347609615716_1049x.png?v=1579813495',
                        alt: '',
                        caption: 'Decorating your bedroom part 3',
                    },
                    formTitle: 'Home is where the heart is! part 3',
                    formMessage: 'Find out how to make house goals a reality part 3',
                    ctaLabel: 'Let\'s do this!',
                    successTitle: 'You’re in! part 3',
                    successMessage: 'Check your inbox for your #demoday. part 3',
                    listName: 'HouseList',
                    legalCopy: 'By completing this form you\'re signing up to receive our financial freedom emails. No pressure — you can unsubscribe at any time',
                    legalUrl: '//www.google.com',
                },
            ],
        },
    ],
}
