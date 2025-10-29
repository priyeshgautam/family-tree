import React, { useState, useEffect } from 'react';
import FamilyTree from './components/FamilyTree';
import MemberDetailsModal from './components/MemberDetailsModal';
import UpcomingEvents from './components/UpcomingEvents';
import { initialData } from './data/initialData';
import { Person, UpcomingEvent } from './types';
import { getUpcomingEvents } from './utils/helpers';

const App: React.FC = () => {
  const [people] = useState<Person[]>(initialData);
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [orientation, setOrientation] = useState<'vertical' | 'horizontal'>('vertical');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Person[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<UpcomingEvent[]>([]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }
    const filtered = people.filter(person =>
      person.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(filtered);
  }, [searchQuery, people]);

  useEffect(() => {
    // Get events for the next 30 days
    const events = getUpcomingEvents(people, 30);
    setUpcomingEvents(events);
  }, [people]);


  const handlePersonClick = (person: Person) => {
    setSelectedPerson(person);
  };

  const handleCloseModal = () => {
    setSelectedPerson(null);
  };

  const handleSearchResultClick = (person: Person) => {
    setSelectedPerson(person);
    setSearchQuery('');
    setSearchResults([]);
  };

  const toggleOrientation = () => {
    setOrientation(prev => (prev === 'vertical' ? 'horizontal' : 'vertical'));
  };

  return (
    <div className="font-sans bg-gray-50 min-h-screen flex flex-col">
      <header className="bg-white shadow-md">
        <div className="px-4 py-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Family Tree
          </h1>
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Find a family member..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {searchResults.length > 0 && (
                <ul className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                  {searchResults.map(person => (
                    <li
                      key={person.id}
                      onClick={() => handleSearchResultClick(person)}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    >
                      {person.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <button
              onClick={toggleOrientation}
              className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 whitespace-nowrap"
            >
              {`View: ${orientation.charAt(0).toUpperCase() + orientation.slice(1)}`}
            </button>
          </div>
        </div>
      </header>
      <main className="py-6 px-4 sm:px-6 lg:px-8 w-full flex flex-col flex-grow gap-6">
        <UpcomingEvents events={upcomingEvents} />
        <div className="flex flex-col h-[80vh]">
          <div
            className="bg-white rounded-lg shadow-xl p-4 relative flex-grow min-h-0"
          >
            <FamilyTree
              people={people}
              onPersonClick={handlePersonClick}
              selectedPersonId={selectedPerson?.id}
              orientation={orientation}
            />
          </div>
        </div>
      </main>
      {selectedPerson && (
        <MemberDetailsModal
          person={selectedPerson}
          allPeople={people}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default App;