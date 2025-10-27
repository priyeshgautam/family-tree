import React from 'react';
import { Person } from '../types';
import { calculateAge } from '../utils/helpers';

interface MemberDetailsModalProps {
  person: Person;
  allPeople: Person[];
  onClose: () => void;
}

const DetailItem: React.FC<{ label: string; value: string | number | React.ReactNode }> = ({ label, value }) => (
  <div className="py-2 sm:grid sm:grid-cols-3 sm:gap-4">
    <dt className="text-sm font-medium text-gray-500">{label}</dt>
    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{value}</dd>
  </div>
);

const MemberDetailsModal: React.FC<MemberDetailsModalProps> = ({ person, allPeople, onClose }) => {
  const parents = allPeople.filter(p => person.parents.includes(p.id));
  const children = allPeople.filter(p => p.parents.includes(person.id));
  const spouse = person.spouseId ? allPeople.find(p => p.id === person.spouseId) : null;
  
  const siblings = allPeople.filter(p => 
    p.id !== person.id && 
    p.parents.length > 0 &&
    person.parents.length > 0 &&
    p.parents.some(parentId => person.parents.includes(parentId))
  );

  const photoSrc = person.photoUrl || `https://ui-avatars.com/api/?name=${person.name.replace(' ', '+')}&background=random&size=128`;
  const age = calculateAge(person.dob, person.dateOfExpiry);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg transform transition-all" onClick={e => e.stopPropagation()}>
        <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div className="w-full">
            <div className="text-center">
              <img
                src={photoSrc}
                alt={person.name}
                className={`w-28 h-28 rounded-full mx-auto mb-4 border-4 border-gray-200 shadow-lg ${person.dateOfExpiry ? 'filter grayscale' : ''}`}
              />
              <h3 className="text-2xl leading-6 font-bold text-gray-900" id="modal-title">
                {person.name}
              </h3>
              <div className="mt-5 border-t border-gray-200 pt-5">
                <dl className="text-left">
                  <DetailItem label="Gender" value={person.gender.charAt(0).toUpperCase() + person.gender.slice(1)} />
                  {person.dateOfExpiry ? (
                    <>
                      <DetailItem label="Born" value={person.dob} />
                      <DetailItem label="Died" value={person.dateOfExpiry} />
                      <DetailItem label="Age at Death" value={`${age} years old`} />
                    </>
                  ) : (
                    <>
                      <DetailItem label="Age" value={`${age} years old`} />
                      <DetailItem label="Date of Birth" value={person.dob} />
                    </>
                  )}
                  <DetailItem label="Place of Birth" value={person.placeOfBirth} />
                  {spouse && <DetailItem label="Spouse" value={spouse.name} />}
                  {person.dateOfMarriage && <DetailItem label="Date of Marriage" value={person.dateOfMarriage} />}
                  <DetailItem label="Parents" value={parents.length > 0 ? parents.map(p => p.name).join(', ') : 'N/A'} />
                  <DetailItem label="Siblings" value={siblings.length > 0 ? siblings.map(s => s.name).join(', ') : 'N/A'} />
                  <DetailItem label="Children" value={children.length > 0 ? children.map(c => c.name).join(', ') : 'N/A'} />
                </dl>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            type="button"
            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default MemberDetailsModal;