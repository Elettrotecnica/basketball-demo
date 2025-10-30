/*
  Custom AR component tracking the pose of the controller
*/
AFRAME.registerSystem("ar-track-pose", {
  init: function () {
    this.inputSource = null;
    this.xr = this.el.renderer.xr;
    this.xr.addEventListener("sessionstart", async () => {
      const session = this.xr.getSession();
      session.addEventListener('selectend', ({ inputSource }) => {
	this.inputSource = inputSource;
      });
    });
  },
  tick: function () {
    const inputSource = this.inputSource;
    if (!inputSource) return;
    this.inputSource = null;

    const frame = this.el.frame;
    if (!frame) return;

    const space = inputSource.targetRaySpace;
    try {
      const pose = frame.getPose(space, this.xr.getReferenceSpace());
      this.el.emit('ar-track-pose-select', { inputSource, pose });
    } catch (e) {
      console.log(e);
    }
  },
});
