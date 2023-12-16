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
    <div className="flex bg-blue-800 justify-evenly text-white pb-6 w-full">
      <div className="flex md:flex-col flex-row justify-evenly">
        <div className="flex md:flex-col flex-row">
          <div className="flex md:flex-row flex-col md:justify-center md:w-screen">
            {props.chordState.keys.map((entry, index) => {
              var label = entry[0];
              var isChecked = entry[1];
              return (
              <div className="m-1" key={index} >              
              <input className="m-1" name={label} type="checkbox" onChange={(e) => props.handleClickKeys(e, index)} checked={isChecked} />
              <label className="m-1">{label[0].toUpperCase() + label.slice(1)}</label>
              </div>
              );
              })
            }
          </div>
          <div className="flex md:flex-row flex-col m-1 justify-center">
            <button className="mx-2 text-xs" onClick={props.selectAllKeys}>Select all</button>
            <button className="mx-2 text-xs" onClick={props.clearAllKeys}>Clear all</button>
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <div className="flex md:flex-col flex-row">
            <div className="flex md:flex-row flex-col justify-center">
              {props.chordState.chords.map((entry, index) => {
                var label = entry[0];
                var isChecked = entry[1];
                return (
                <div className="m-1" key={index} >            
                <input className="m-1" name={label} type="checkbox" onChange={(e) => props.handleClickChords(e, index)} checked={isChecked} />
                <label className="m-1">{label}</label>
                </div>
                );
                })
              }
            </div>
            <div className="flex md:flex-row flex-col m-1 justify-center">
              <button className="mx-2 text-xs" onClick={props.selectAllChords}>Select all</button>
              <button className="mx-2 text-xs" onClick={props.clearAllChords}>Clear all</button>
            </div>
          </div>
          <div className="flex flex-col m-2 justify-center">
          <div className="flex flex-col md:flex-row md:justify-center">
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
        </div>
        
      
      </div>
      
    </div>                     
  )
}