import React from 'react';
import { Person } from '../types';
import type { CustomNodeElementProps } from 'react-d-3-tree/lib/types/types/common';
import { calculateAge } from '../utils/helpers';

// FIX: Replaced `interface extends` with a `type` intersection.
// This resolves a TypeScript error where the inherited `nodeDatum` property was not being found during prop destructuring.
type CustomNodeProps = CustomNodeElementProps & {
  people: Person[];
  onPersonClick: (person: Person) => void;
  selectedPersonId?: number;
};

const NodeCard: React.FC<{
  person: Person;
  onClick: (person: Person) => void;
  isSelected: boolean;
  isSpouse?: boolean;
}> = ({ person, onClick, isSelected, isSpouse = false }) => {
  const photoSrc = person.photoUrl || `https://ui-avatars.com/api/?name=${person.name.replace(' ', '+')}&background=random&size=128`;
  const borderColor = person.gender === 'male' ? 'border-blue-400' : 'border-pink-400';
  const selectedClasses = isSelected ? 'ring-2 ring-offset-2 ring-indigo-500' : 'shadow-md';
  const age = calculateAge(person.dob, person.dateOfExpiry);
  const isDeceased = !!person.dateOfExpiry;

  const cardShapeClasses = isSpouse 
    ? 'rounded-full w-32 h-32' 
    : 'rounded-md w-28 h-40';
  
  const imageSizeClasses = isSpouse
    ? 'w-14 h-14'
    : 'w-16 h-16';
  
  const ageText = isSpouse ? `${age} yrs` : `${age} years old`;

  return (
    <div
      onClick={() => onClick(person)}
      className={`bg-white p-2 cursor-pointer border ${borderColor} ${selectedClasses} flex flex-col items-center text-center justify-center transform hover:scale-105 transition-transform duration-200 ${cardShapeClasses}`}
    >
      <img
        src={photoSrc}
        alt={person.name}
        className={`rounded-full object-cover mb-1 ${imageSizeClasses} ${isDeceased ? 'filter grayscale' : ''}`}
      />
      <p className="font-bold text-gray-800 text-xs leading-tight break-words max-w-full">{person.name}</p>
      {isDeceased ? (
        <p className="text-xs text-gray-500 mt-1">
          {person.dob.split('-')[0]} - {person.dateOfExpiry.split('-')[0]}
        </p>
      ) : (
        <p className="text-xs text-gray-600 mt-1">{ageText}</p>
      )}
    </div>
  );
};

// Fix: Explicitly typing the component with React.FC to help resolve a TypeScript type inference issue.
const CustomNode: React.FC<CustomNodeProps> = ({ nodeDatum, people, onPersonClick, selectedPersonId }) => {
  const personId = nodeDatum.attributes?.personId as number;

  if (!personId) {
    return null;
  }

  const person = people.find(p => p.id === personId);

  if (!person) {
    return null;
  }

  const spouse = person.spouseId ? people.find(p => p.id === person.spouseId) : null;

  const hasSpouse = spouse !== null;
  const cardWidth = 112; // w-28 is 112px
  const spouseCardWidth = 128; // w-32 is 128px
  const iconWidth = 32;  // w-8 is 32px
  const gap = 16;        // space from px-2 on icon container
  const totalWidth = hasSpouse ? cardWidth + iconWidth + gap + spouseCardWidth : cardWidth;
  const xOffset = -totalWidth / 2;
  const cardHeight = 160; // h-40 is 160px, tall enough for both card types
  const yOffset = -cardHeight / 2;
  
  return (
    <g>
      <foreignObject x={xOffset} y={yOffset} width={totalWidth} height={cardHeight}>
        <div className="flex items-center justify-center h-full">
            <NodeCard
              person={person}
              onClick={onPersonClick}
              isSelected={selectedPersonId === person.id}
            />
            {spouse && (
              <>
                <div className="px-2">
                  <svg 
                    className="w-8 h-8 text-gray-400" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                    strokeWidth="1"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path>
                  </svg>
                </div>
                <NodeCard
                  person={spouse}
                  onClick={onPersonClick}
                  isSelected={selectedPersonId === spouse.id}
                  isSpouse={true}
                />
              </>
            )}
        </div>
      </foreignObject>
    </g>
  );
};

export default CustomNode;
