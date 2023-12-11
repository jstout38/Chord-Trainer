'use client'

import Image from 'next/image'
import { useState, useEffect, useRef } from 'react';
import Option from './options';

export type chordSettingsType = {
  keys: [string, boolean][],
  chords: [string, boolean][],
};


type chordListType = {
  keys: string[],
  chords: string[],
}

export default function Home() {
  
  const keys = [ "c", "d", "d♭", "e", "e♭", "f", "g", "g♭", "a", "a♭", "b", "b♭", ]
  const chords =[ "maj7", "7", "m7", "°7", "ø7", ]
  const [ chordState, setChordState ] = useState<chordSettingsType>(
    {
      keys: keys.map((entry) => ([entry,false])),
      chords: chords.map((entry) => ([entry,false]))
    }
  );

  const [ chordList, setChordList ] = useState<string[]>([]);

  const [ currentChord, setCurrentChord ] = useState('');

  const [ chordSpeed, setChordSpeed ] = useState(2.5);

  useEffect(() => {
      var updatedChords = [];
      for (var i=0; i < chordState.chords.length; i++) {
        for (var j = 0; j < chordState.keys.length; j++) {
          if (chordState.keys[j][1]) {
            var newChord = chordState.keys[j][0];
            if (chordState.chords[i][1]) {
              newChord = newChord[0].toUpperCase() + newChord.slice(1);
              newChord += chordState.chords[i][0];
              updatedChords.push(newChord)
            }
            
          }        
        }
      }
      setChordList(updatedChords);
  }, [chordState]);



  const handleClickKeys = async (event: React.ChangeEvent, position: number) => {
    const updatedKeyState : [string, boolean][] = chordState.keys.map((item, index) =>
      [item[0], index === position ? !item[1] : item[1]]
    );

    setChordState({
      ...chordState,
      keys: updatedKeyState,    
      })

  }

  const handleClickChords = async (event: React.ChangeEvent, position: number) => {
    const updatedChordState : [string, boolean][] = chordState.chords.map((item, index) => 
      [item[0], index === position ? !item[1] : item[1]]
    );

    setChordState({
      ...chordState,
      chords: updatedChordState,
    })

  }

  const clearAllKeys = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const updatedKeyState : [string, boolean][] = chordState.keys.map((item) =>
      [item[0], false]
    );

    setChordState({
      ...chordState,
      keys: updatedKeyState,
    })
  }

  const selectAllKeys = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const updatedKeyState : [string, boolean][] = chordState.keys.map((item) =>
      [item[0], true]
    );

    setChordState({
      ...chordState,
      keys: updatedKeyState,
    })
  }

  const clearAllChords = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const updatedChordState : [string, boolean][] = chordState.chords.map((item) =>
      [item[0], false]
    );

    setChordState({
      ...chordState,
      chords: updatedChordState,
    })
  }

  const selectAllChords = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const updatedChordState : [string, boolean][] = chordState.chords.map((item) =>
      [item[0], true]
    );

    setChordState({
      ...chordState,
      chords: updatedChordState,
    })
  }

  const chordIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const startChords = async (event: React.MouseEvent<HTMLButtonElement>) => {      
    if (!chordIntervalRef.current && chordList.length > 0) {
      var chordIndex = Math.floor(Math.random() * chordList.length);
      setCurrentChord(chordList[chordIndex]);  
      chordIntervalRef.current = setInterval(() => {
          var chordIndex = Math.floor(Math.random() * chordList.length);
          setCurrentChord(chordList[chordIndex]);
      }, 1000 * chordSpeed);
    }    
  }

  const stopChords = async (event: React.MouseEvent<HTMLButtonElement>) => {
    clearInterval(chordIntervalRef.current as NodeJS.Timeout);
    chordIntervalRef.current = null;
    setCurrentChord('');
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="flex flex-row w-screen pt-24 p-12 justify-center text-white text-7xl bg-teal-800">Chord Trainer</div>
      <div className="text-9xl h-1">{currentChord}</div>
      <Option
        chordState={chordState} 
        startChords={startChords} 
        stopChords={stopChords}
        handleClickKeys={handleClickKeys}
        handleClickChords={handleClickChords}
        selectAllKeys={selectAllKeys}
        clearAllKeys={clearAllKeys}
        selectAllChords={selectAllChords}
        clearAllChords={clearAllChords}
        chordSpeed={chordSpeed}
        setChordSpeed={setChordSpeed}
      />
    </main>
  )
}
