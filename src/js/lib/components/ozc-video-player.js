/**
 * Class representing an 'ozc-video-player' component.
 * Generates a VideoPlayer component with support for YouTube videos.
 * Has a dependency on YouTube iframe_api.
 *
 * @export
 * @class VideoPlayer
 * @extends BaseNode
 *
 * @param {object} options - options for creating component.
 * @param {string} options.youTubeVideoId - YouTube Video Id of the video to load.
 * @param {number} [options.width=640] - video player width.
 * @param {number} [options.height=390] - video player height.
 * @param {boolean} [options.fixedSize=] - if True, video dimensions will be fixed.
 *        Defaults to a responsive size, with dimensions determined by width and height.
 * @param {object} [options.playerVars=] - player variable properties to set.
 *
 * @example
 *
 *     1. Create new instance of VideoPlayer component
 *     const player = new VideoPlayer({
 *        youTubeVideoId: 's7f9s6sg9s86fs6975',
 *        width: 600,
 *        height: 400,
 *     });
 *
 *    2. Add player element to the DOM
 *         const targetEl = document.document.getElementById('123');
 *         targetEl.appendChild(player.el);
 *
 *    3. Initialize the player
 *    VideoPlayer.init();
 *        - VideoPlayer.init() will loop through all existing instances of VideoPlayer
 *        to create a new player (if not created yet). This is necessary due to the
 *        asynchronous nature of loading the YouTube API the 'onYouTubeIframeAPIReady' callback.
 */

SDG.Component = SDG.Component || {};

SDG.Component.VideoPlayer = class VideoPlayer extends SDG.Component.BaseNode {
    constructor (options) {
        options = options || {};

        super(options);

        this.youTubeVideoId = options.youTubeVideoId;
        this.playerId = this.constructor.generateUniquePlayerId();

        this.fixedSize = options.fixedSize;
        this.playerVars = options.playerVars;
        this.width = options.width || this.constructor.defaults.VIDEO_WIDTH;
        this.height = options.height || this.constructor.defaults.VIDEO_HEIGHT;

        this.el = this.createEl();

        this.constructor.instances = this.constructor.instances || [];
        this.constructor.instances.push(this);

        if (this.youTubeVideoId) {
            this.constructor.setOnYouTubeIframeAPIReady();
            this.constructor.loadYouTubeAPI();
        }
    }

    init () {
        this.constructor.init();
    }

    createEl () {
        const CSS_CLASS_BASE = this.constructor.cssBaseClass;
        const CSS_CLASS_VIDEO = `${CSS_CLASS_BASE}__video`;
        const CSS_CLASS_RESPONSIVE = `${CSS_CLASS_BASE}--responsive`;
        const PLAYER_ID = this.playerId;

        let CSS_CLASS_COMPONENT = CSS_CLASS_BASE;
        let placeholderEl;

        if (!this.fixedSize) {
            CSS_CLASS_COMPONENT = `${CSS_CLASS_COMPONENT} ${CSS_CLASS_RESPONSIVE}`;

            placeholderEl = this.placeholderEl();
        }

        const video = new SDG.Component.Element({
            cssClasses: CSS_CLASS_VIDEO,
            attributes: {
                id: PLAYER_ID,
            },
        });

        const component = new SDG.Component.Element({
            cssClasses: CSS_CLASS_COMPONENT,
            children: [
                placeholderEl,
                video,
            ],
        });

        return component.el;
    }

    placeholderEl () {
        const CSS_CLASS_PLACEHOLDER = `${this.constructor.cssBaseClass}__placeholder`;
        const ASPECT_RATIO = this.height / this.width;
        const PADDING = (ASPECT_RATIO * 100).toFixed(2);

        return new SDG.Component.Element({
            cssClasses: CSS_CLASS_PLACEHOLDER,
            styles: {
                'padding-top': `${PADDING}%`,
            },
        });
    }

    // CLASS METHODS

    static createNewPlayer (instance) {
        // if instance player already exists, return
        if (instance && instance.player) {
            return true;
        }

        if (!this.youTubeAPILoaded()) {
            /* eslint-disable-next-line  no-console */
            console.warn('[SDG.Component.VideoPlayer createNewPlayer] YT library not loaded yet.');

            return false;
        }

        const VIDEO_ID = instance && instance.youTubeVideoId;

        if (!VIDEO_ID) {
            /* eslint-disable-next-line  no-console */
            console.error('[SDG.Component.VideoPlayer createNewPlayer] YouTube videoId missing');

            return false;
        }

        /* eslint-disable-next-line  no-console */
        console.info(`[SDG.Component.VideoPlayer createNewPlayer] creating YouTube player for videoId: ${VIDEO_ID}`);

        const PLAYER_ID = instance.playerId;
        const playerContainerExists = document.getElementById(PLAYER_ID);

        if (!playerContainerExists) {
            /* eslint-disable-next-line  no-console */
            console.warn(`[SDG.Component.VideoPlayer createNewPlayer] Target DOM element does not exist for videoID: ${VIDEO_ID}.`);

            return false;
        }

        const VIDEO_WIDTH = instance.width;
        const VIDEO_HEIGHT = instance.height;
        const PLAYER_VARS = Object.assign(this.defaults.YOUTUBE_PLAYER_VARS, instance.playerVars);

        instance.player = new window.YT.Player(PLAYER_ID, {
            width: VIDEO_WIDTH,
            height: VIDEO_HEIGHT,
            videoId: VIDEO_ID,
            playerVars: PLAYER_VARS,
        });
    }

    /*
        This is same as the instance method. However, 'init' must be called when the
        player element is inserted into the DOM, and calling the instance method may
        not be feasible at that point. Calling the class method has same effect.

        Loops through all instances in order to account for setOnYouTubeIframeAPIReady
        being called only once gobally and being async. This allows for instantiating
        multiple video players per page.
    */
    static init () {
        this.instances.forEach((instance) => {
            this.createNewPlayer(instance);
        });
    }

    static setOnYouTubeIframeAPIReady () {
        window.onYouTubeIframeAPIReady = this.init.bind(this);
    }

    static youTubeAPILoaded () {
        return SDG.Utility.ScriptLoad.isLoadedYouTubeAPI();
    }

    static loadYouTubeAPI () {
        return SDG.Utility.ScriptLoad.youTubeAPI();
    }

    static generateUniquePlayerId () {
        const UNIQUE_PLAYER_ID = `player-${Date.now()}`;

        return UNIQUE_PLAYER_ID;
    }

    static get cssBaseClass () {
        const CSS_CLASS_BASE = 'ozc-video-player';

        return CSS_CLASS_BASE;
    }

    static get defaults () {
        return {
            VIDEO_WIDTH: 640,
            VIDEO_HEIGHT: 390,
            YOUTUBE_PLAYER_VARS: {
                autoplay: 0,
                controls: 1,
                modestbranding: 1,
                enablejsapi: 1,
                rel: 0,
            },
        };
    }
};

export default SDG.Component.VideoPlayer;
