import React from 'react';
import { UpcomingEvent } from '../types';

interface UpcomingEventsProps {
  events: UpcomingEvent[];
}

const BirthdayIcon = () => (
  <svg className="w-6 h-6 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0c-.454-.303-.977-.454-1.5-.454A3.5 3.5 0 003 19.046c0 .713.23 1.385.62 1.954.39.57.942 1.054 1.56 1.404a4.5 4.5 0 005.64 0c.618-.35.1.168-.84.946-1.5.454-1.5.908-1.5 1.546h12c0-.638 0-1.092-1.5-1.546-.958-.778-1.458-1.296-.84-.946a4.5 4.5 0 005.64 0c.618-.35.1.168.942-1.054.39-.57.62-1.24.62-1.954a3.5 3.5 0 00-3.5-3.5zM12 12a3 3 0 100-6 3 3 0 000 6z" /></svg>
);

const AnniversaryIcon = () => (
  <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.874 15.126c.492.296.985.517 1.478.662M19.126 15.126c-.492.296-.985.517-1.478.662M12 19.5c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 12c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM7 17.5c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM17 17.5c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 4.5c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z" /></svg>
);

const RemembranceIcon = () => (
  <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531A3.374 3.374 0 006.09 17.04l-.547-.547z" /></svg>
);


const EventCard: React.FC<{ event: UpcomingEvent }> = ({ event }) => {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString(undefined, { month: 'long', day: 'numeric' });
  };

  const getDaysUntilText = (days: number) => {
    if (days === 0) return 'Today';
    if (days === 1) return 'Tomorrow';
    return `in ${days} days`;
  };
  
  const getOrdinal = (n: number) => {
    if (n > 3 && n < 21) return `${n}th`;
    switch (n % 10) {
      case 1: return `${n}st`;
      case 2: return `${n}nd`;
      case 3: return `${n}rd`;
      default: return `${n}th`;
    }
  };

  const renderIcon = () => {
    switch (event.type) {
      case 'Birthday': return <BirthdayIcon />;
      case 'Marriage Anniversary': return <AnniversaryIcon />;
      case 'Death Anniversary': return <RemembranceIcon />;
      default: return null;
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow flex items-center space-x-4">
      <div className="flex-shrink-0">
        {renderIcon()}
      </div>
      <div className="flex-1">
        <p className="font-bold text-gray-800">
          {event.type === 'Marriage Anniversary' ? `${event.personName} & ${event.spouseName}` : event.personName}
        </p>
        <p className="text-sm text-gray-600">
          {event.anniversaryYear ? `${getOrdinal(event.anniversaryYear)} ` : ''}
          {event.type}
          {event.type === 'Birthday' && ` (Turning ${event.age})`}
        </p>
      </div>
      <div className="text-right">
        <p className="font-semibold text-indigo-600">{formatDate(event.date)}</p>
        <p className="text-sm text-gray-500">{getDaysUntilText(event.daysUntil)}</p>
      </div>
    </div>
  );
};

const UpcomingEvents: React.FC<UpcomingEventsProps> = ({ events }) => {
  if (events.length === 0) {
    return (
       <div className="bg-white rounded-lg shadow p-4 mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Upcoming Events</h2>
        <p className="text-gray-500">No upcoming events in the next 30 days.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Upcoming Events (Next 30 Days)</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map((event, index) => (
          <EventCard key={`${event.personId}-${event.type}-${index}`} event={event} />
        ))}
      </div>
    </div>
  );
};

export default UpcomingEvents;