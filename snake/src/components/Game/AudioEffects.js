import { useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import dd from '../../assets/audio/dd.mp3';
import final from '../../assets/audio/final.mp3';
import eat from '../../assets/audio/eat.mp3';

const AudioEffects = (props) => {
  const { isPlaying, isShowResult, score, settings } = props;
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

const mapStateToProps = (store) => ({
  settings: store.settings,
});

export default connect(mapStateToProps)(AudioEffects);
