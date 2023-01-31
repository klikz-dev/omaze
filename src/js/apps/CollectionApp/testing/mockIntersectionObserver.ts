export interface IMockIntersectionObserver extends IntersectionObserver {
    triggerIntersection(entries: IntersectionObserverEntry[]): void;
}

// DOMRectReadOnly is needed to test IntersectionObserver but is not exposed publicly, so we need to recreate it
export class DOMRectReadOnly {
    public readonly bottom: number = 0;
    public readonly height: number;
    public readonly left: number = 0;
    public readonly right: number = 0;
    public readonly top: number = 0;
    public readonly width: number;
    public readonly x: number;
    public readonly y: number;

    public toJSON (): any {
        return JSON.stringify(this);
    }

    public constructor (x?: number, y?: number, width?: number, height?: number) {
        this.x = x || 0;
        this.y = y || 0;
        this.width = width || 0;
        this.height = height || 0;
    }

    public static fromRect (other?: DOMRectInit): DOMRectReadOnly {
        return new DOMRectReadOnly(other?.x, other?.y);
    }
}

let observer: IntersectionObserver;
let OriginalIntersectionObserver: typeof window.IntersectionObserver;

export function getMockObserver (): IMockIntersectionObserver {
    return observer as IMockIntersectionObserver;
}

export function mockIntersectionObserver (): void {
    OriginalIntersectionObserver = window.IntersectionObserver;

    window.IntersectionObserver = class MockIntersectionObserver {
        public readonly root: Element | null;
        public readonly rootMargin: string;
        public readonly thresholds: ReadonlyArray<number>;

        private readonly callback: IntersectionObserverCallback;

        public constructor (callback: IntersectionObserverCallback, config?: IntersectionObserverInit) {
            this.root = config?.root || null;
            this.rootMargin = config?.rootMargin || '0px';
            this.thresholds = [0];

            this.callback = callback;

            observer = this;
        }

        public disconnect: () => void = jest.fn();
        public observe: (target: Element) => void = jest.fn();
        public takeRecords: () => IntersectionObserverEntry[] = jest.fn();
        public unobserve: (target: Element) => void = jest.fn();

        public triggerIntersection (entries: IntersectionObserverEntry[]): void {
            this.callback(entries, this);
        }
    };
}

export function restoreIntersectionObserver (): void {
    window.IntersectionObserver = OriginalIntersectionObserver;
}
