import {
  EditorLayer,
  SpeedValue,
  SpeedValueAsetPts,
  defaultVideoDuration,
} from '../../types';

export const getTotalTime = (layers: EditorLayer[]): number => {
  if (!layers || !layers.length) return 0;
  const time = layers?.reduce((a, layer) => {
    const t = layer.media?.reduce((agv, media, index) => {
      const mediaSpeed =
        media?.encoding?.speed && media?.encoding?.speed !== SpeedValue['100%']
          ? SpeedValueAsetPts[media?.encoding?.speed]
          : 1.0;
      const transitionOffset =
        layer.media?.[index + 1]?.encoding?.transitionIn &&
        layer.media?.[index + 1]?.encoding?.transitionIn !== 'none'
          ? layer.media?.[index + 1]?.encoding?.transitionInDuration || 3
          : 0;
      const itemDuration =
        (media?.encoding?.end || media?.duration || defaultVideoDuration) -
        (media?.encoding?.start || 0);
      agv +=
        (itemDuration - transitionOffset) * parseFloat(mediaSpeed as string);
      return agv;
    }, 0);
    if (!t) return a;
    if (a > t) return a;
    if (t > a) return t;
  }, 0);
  return time as any as number;
};
