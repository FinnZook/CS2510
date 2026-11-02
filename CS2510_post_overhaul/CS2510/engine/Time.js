class Time {
    static deltaTime = 0;
    static unscaledDeltaTime = 0;
    static time = 0;
    static timeScale = 1;
    static maxDeltaTime = 0.1;
    static lastTimestamp = null;

    static reset(timeScale = 1) {
        Time.deltaTime = 0;
        Time.unscaledDeltaTime = 0;
        Time.time = 0;
        Time.timeScale = timeScale;
        Time.lastTimestamp = null;
    }

    static update(timestamp) {
        if (Time.lastTimestamp === null) {
            Time.lastTimestamp = timestamp;
            Time.deltaTime = 0;
            Time.unscaledDeltaTime = 0;
            return;
        }

        Time.unscaledDeltaTime = Math.min(
            Math.max((timestamp - Time.lastTimestamp) / 1000, 0),
            Time.maxDeltaTime
        );
        Time.lastTimestamp = timestamp;
        Time.deltaTime = Time.unscaledDeltaTime * Time.timeScale;
        Time.time += Time.deltaTime;
    }
}
