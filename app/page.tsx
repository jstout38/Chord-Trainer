'use client'

import Image from 'next/image'
import { useState } from 'react';

type chordSettingsType = {
  string: boolean
};


type chordListType = {
  keys: string[],
  chords: string[],
}

export default function Home() {
  
  const options = [ "a", "b", "c", "d", "e", "f", "g", "a♭", "b♭", "d♭", "e♭", "g♭", "maj7", "dom7", "min7", "dim7", "halfdim7", ]
  const [ chordState, setChordState ] = useState<{[key: string]: boolean}[]>(
    options.map((entry) => ({[entry]: false}))
  );

  const [ chordList, setChordlist ] = useState<chordListType>({
    keys: [],
    chords: []
  });

  function addKey(key: string) {
    for (var i = 0; i < chordList.keys.length; i++) {
      if (chordList.keys[i] === key) {
        return;
      }
    }
    setChordlist({
      ...chordList,
      keys: [
        ...chordList.keys,
        key
      ]
    })
  }

  function handleClick (event: React.ChangeEvent, position: number) {
    const updatedChordState : {[key: string]: boolean}[] = chordState.map((item, index) =>
      ({[Object.keys(item)[0]]: index === position ? !Object.values(item)[0] : Object.values(item)[0]})
    );

    setChordState(updatedChordState);
    console.log(chordState);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>Chords</div>
      <div>Chord trainer</div>      
        {chordState.map((entry, index) => {
          var label = Object.keys(entry)[0];
          var isChecked = Object.values(entry)[0];
          return (
          <div key={index} >
          <label>{label}</label>
          <input name={label} type="checkbox" onChange={(e) => handleClick(e, index)} checked={isChecked} />
          </div>
          );
          })
        }        
    </main>
  )
}
