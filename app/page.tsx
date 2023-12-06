'use client'

import Image from 'next/image'
import { useState } from 'react';

type chordSettingsType = {
  a: boolean,
  b: boolean,
  c: boolean,
  d: boolean,
  e: boolean,
  f: boolean,
  g: boolean,
  aflat: boolean,
  bflat: boolean,
  dflat: boolean,
  eflat: boolean,
  gflat: boolean,
  maj7: boolean,
  dom7: boolean,
  min7: boolean,
  dim7: boolean,
  halfdim7: boolean,
}

export default function Home() {
  
  const [ chordState, setChordState ] = useState<chordSettingsType>({
    a: true,
    b: false,
    c: false,
    d: false,
    e: false,
    f: false,
    g: false,
    aflat: false,
    bflat: false,
    dflat: false,
    eflat: false,
    gflat: false,
    maj7: false,
    dom7: false,
    min7: false,
    dim7: false,
    halfdim7: false,
  });

  function handleClick(e: React.ChangeEvent) {
    var change = !chordState.a;
    setChordState({...chordState, a: change});
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>Chords</div>
      <div>Chord trainer</div>
      <form>
        <label>A</label>
        <input type="checkbox" onChange={handleClick} checked={chordState.a}></input>
        <label>A♭</label>
        <input type="checkbox" checked={chordState.aflat}></input>
        <label>B</label>
        <input type="checkbox" checked={chordState.b}></input>
        <label>B♭</label>
        <input type="checkbox" checked={chordState.bflat}></input>
        <label>C</label>
        <input type="checkbox" checked={chordState.c}></input>
        <label>D</label>
        <input type="checkbox" checked={chordState.d}></input>
        <label>D♭</label>
        <input type="checkbox" checked={chordState.dflat}></input>
        <label>E</label>
        <input type="checkbox" checked={chordState.e}></input>
        <label>E♭</label>
        <input type="checkbox" checked={chordState.eflat}></input>
        <label>F</label>
        <input type="checkbox" checked={chordState.f}></input>
        <label>G</label>
        <input type="checkbox" checked={chordState.g}></input>
        <label>G♭</label>
        <input type="checkbox" checked={chordState.gflat}></input>
        <label>Dominant 7th</label>
        <input type="checkbox" checked={chordState.dom7}></input>
      </form>
    </main>
  )
}
