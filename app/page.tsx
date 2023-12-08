'use client'

import Image from 'next/image'
import { useState, useEffect, useRef } from 'react';

type chordSettingsType = {
  keys: [string, boolean][],
  chords: [string, boolean][],
};


type chordListType = {
  keys: string[],
  chords: string[],
}

export default function Home() {
  
  const keys = [ "c", "d", "d♭", "e", "e♭", "f", "g", "g♭", "a", "a♭", "b", "b♭", ]
  const chords =[ "maj7", "7", "m7", "dim7", "dim-7", ]
  const [ chordState, setChordState ] = useState<chordSettingsType>(
    {
      keys: keys.map((entry) => ([entry,false])),
      chords: chords.map((entry) => ([entry,false]))
    }
  );

  const [ chordList, setChordList ] = useState<string[]>([]);

  const [ currentChord, setCurrentChord ] = useState('');

  const [ chordsStarted, setChordsStarted ] = useState(false);


  // function updateChordList() {
  //   var updatedChords = [];
  //   for (var i=0; i < chordState.chords.length; i++) {
  //     for (var j = 0; j < chordState.keys.length; j++) {
  //       if (chordState.keys[j][1]) {
  //         var newChord = chordState.keys[j][0];
  //         if (chordState.chords[i][1]) {
  //           newChord += chordState.chords[i][0];
  //           updatedChords.push(newChord)
  //         }
          
  //       }        
  //     }
  //   }
  //   setChordList(updatedChords);
  // }

  useEffect(() => {
      var updatedChords = [];
      for (var i=0; i < chordState.chords.length; i++) {
        for (var j = 0; j < chordState.keys.length; j++) {
          if (chordState.keys[j][1]) {
            var newChord = chordState.keys[j][0];
            if (chordState.chords[i][1]) {
              newChord += chordState.chords[i][0];
              updatedChords.push(newChord)
            }
            
          }        
        }
      }
      setChordList(updatedChords);
  }, [chordState]);



  const handleClickKeys = async (event: React.ChangeEvent, position: number) => {
    const updatedChordState : [string, boolean][] = chordState.keys.map((item, index) =>
      [item[0], index === position ? !item[1] : item[1]]
    );

    setChordState({
      ...chordState,
      keys: updatedChordState,    
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

  const chordIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const startChords = async (event: React.MouseEvent<HTMLButtonElement>) => {      
      chordIntervalRef.current = setInterval(() => {
        var chordIndex = Math.floor(Math.random() * chordList.length);
        setCurrentChord(chordList[chordIndex]);
      }, 1000);    
  }

  const stopChords = async (event: React.MouseEvent<HTMLButtonElement>) => {
    clearInterval(chordIntervalRef.current as NodeJS.Timeout);
    chordIntervalRef.current = null;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>Chords</div>
      <div>Chord trainer</div>      
      {currentChord}
      <div>
        {chordState.keys.map((entry, index) => {
          var label = entry[0];
          var isChecked = entry[1];
          return (
          <div key={index} >
          <label>{label[0].toUpperCase() + label.slice(1)}</label>
          <input name={label} type="checkbox" onChange={(e) => handleClickKeys(e, index)} checked={isChecked} />
          </div>
          );
          })
        }
      
        {chordState.chords.map((entry, index) => {
          var label = entry[0];
          var isChecked = entry[1];
          return (
          <div key={index} >
          <label>{label}</label>
          <input name={label} type="checkbox" onChange={(e) => handleClickChords(e, index)} checked={isChecked} />
          </div>
          );
          })
        }

        <button onClick={startChords}>Start Chords</button>
        <button onClick={stopChords}>Stop Chords</button>
      </div>
                     
    </main>
  )
}
