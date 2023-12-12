import { useState, useRef } from 'react';
import { chordSettingsType } from './page';

type optionProps = {
  chordState: chordSettingsType,
  startChords: React.MouseEventHandler<HTMLButtonElement>,
  stopChords: React.MouseEventHandler<HTMLButtonElement>,
  handleClickKeys: Function,
  handleClickChords: Function,
  selectAllKeys: React.MouseEventHandler<HTMLButtonElement>,
  clearAllKeys: React.MouseEventHandler<HTMLButtonElement>,
  selectAllChords: React.MouseEventHandler<HTMLButtonElement>,
  clearAllChords: React.MouseEventHandler<HTMLButtonElement>,
  chordSpeed: number,
  setChordSpeed: Function,
}

export default function Options(props: optionProps) {  

  return (
    <div className="bg-blue-800 text-white w-full pb-12">
      <div className="flex flex-col">
        <div className="flex flex-row justify-center">
          {props.chordState.keys.map((entry, index) => {
            var label = entry[0];
            var isChecked = entry[1];
            return (
            <div className="m-1" key={index} >
            <label className="m-1">{label[0].toUpperCase() + label.slice(1)}</label>
            <input className="m-1" name={label} type="checkbox" onChange={(e) => props.handleClickKeys(e, index)} checked={isChecked} />
            </div>
            );
            })
          }
        </div>
        <div className="flex flex-row justify-center">
          <button className="mx-2 text-xs" onClick={props.selectAllKeys}>Select all</button>
          <button className="mx-2 text-xs" onClick={props.clearAllKeys}>Clear all</button>
        </div>
        <div className="flex flex-row justify-center">
          {props.chordState.chords.map((entry, index) => {
            var label = entry[0];
            var isChecked = entry[1];
            return (
            <div className="m-1" key={index} >
            <label className="m-1">{label}</label>
            <input className="m-1" name={label} type="checkbox" onChange={(e) => props.handleClickChords(e, index)} checked={isChecked} />
            </div>
            );
            })
          }
        </div>
        <div className="flex flex-row justify-center">
          <button className="mx-2 text-xs" onClick={props.selectAllChords}>Select all</button>
          <button className="mx-2 text-xs" onClick={props.clearAllChords}>Clear all</button>
        </div>        
      </div>
      <div className="flex flex-row justify-center">
        <button className="bg-green-500 m-1 p-2 rounded text-white" onClick={props.startChords}>Start Chords</button>
        <button className="bg-red-500 p-2 rounded m-1 text-white" onClick={props.stopChords}>Stop Chords</button>
      </div>
      <div className="slidecontainer">
        <div className="flex flex-row justify-center">
          <input 
            type="range" 
            min=".5" 
            max="5"  
            step=".5" 
            value={props.chordSpeed} 
            onChange={(e) => {props.setChordSpeed(e.target.value)}}
            className="slider" 
            id="myRange" />
        </div>
        <div className="flex flex-row justify-center">
          {props.chordSpeed} seconds per chord
        </div>
      </div>
    </div>                     
  )
}