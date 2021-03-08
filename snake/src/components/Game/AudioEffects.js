import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import dd from '../../assets/audio/dd.mp3';
import final from '../../assets/audio/final.mp3';
import eat from '../../assets/audio/eat.mp3';

export const AudioEffects = (props) => {
  const settings = useSelector((state) => state.settings);
  const { isPlaying, isShowResult, score } = props;
  const { musicOn, musicVolume, soundOn, soundVolume } = settings;

  const gameMusic = useMemo(() => {
    const effect = new Audio(dd);
    effect.volume = musicVolume / 100;
    effect.loop = true;

    return effect;
  }, [musicVolume]);

  const finishSound = useMemo(() => {
    const effect = new Audio(final);
    effect.volume = soundVolume / 100;

    return effect;
  }, [soundVolume]);

  const eatSound = useMemo(() => {
    const effect = new Audio(eat);
    effect.volume = soundVolume / 100;

    return effect;
  }, [soundVolume]);

  useEffect(() => {
    if (isPlaying && musicOn) {
      gameMusic.play();
    } else {
      gameMusic.pause();
    }
  }, [isPlaying, gameMusic, musicOn]);

  useEffect(() => {
    if (score > 0 && soundOn) {
      eatSound.play();
    }
  }, [eatSound, score, soundOn]);

  useEffect(() => {
    if (isShowResult && soundOn) {
      finishSound.play();
    }
  }, [finishSound, isShowResult, soundOn]);

  return null;
};
