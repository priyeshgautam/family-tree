import { Person, UpcomingEvent } from '../types';
import type { RawNodeDatum } from 'react-d3-tree/lib/types/types/common';

/**
 * Calculates the age of a person based on their date of birth and optional date of death.
 * @param dobString - The date of birth in 'YYYY-MM-DD' format.
 * @param dodString - The optional date of death in 'YYYY-MM-DD' format.
 * @returns The calculated age in years.
 */
export const calculateAge = (dobString: string, dodString?: string): number => {
  const dob = new Date(dobString);
  const endDate = dodString ? new Date(dodString) : new Date();
  let age = endDate.getFullYear() - dob.getFullYear();
  const m = endDate.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && endDate.getDate() < dob.getDate())) {
    age--;
  }
  return age;
};

/**
 * Transforms a flat array of people into a hierarchical tree structure
 * suitable for react-d3-tree.
 * @param people - The flat array of Person objects.
 * @returns A single root RawNodeDatum object.
 */
export const buildHierarchyTree = (people: Person[]): RawNodeDatum => {
  if (people.length === 0) {
    return { name: 'Family', children: [] };
  }

  const peopleMap = new Map(people.map(p => [p.id, p]));
  const nodeMap = new Map<number, RawNodeDatum>();

  // Create a node for each person
  people.forEach(person => {
    nodeMap.set(person.id, {
      name: person.name,
      attributes: { personId: person.id },
      children: [],
    });
  });

  const rootNodes: RawNodeDatum[] = [];

  // Link children to their primary parent
  people.forEach(person => {
    const node = nodeMap.get(person.id)!;
    if (person.parents.length === 0) {
      rootNodes.push(node);
    } else {
      // Attach child to the parent with the smaller ID to avoid duplication
      const primaryParentId = person.parents.sort((a, b) => a - b)[0];
      const parentNode = nodeMap.get(primaryParentId);
      if (parentNode) {
        parentNode.children.push(node);
      } else {
        // Parent not in the dataset, so this person is a root
        rootNodes.push(node);
      }
    }
  });

  // Filter out spouses who will be rendered alongside their partner
  const filteredRoots = rootNodes.filter(node => {
      const person = peopleMap.get(node.attributes!.personId as number)!;
      if (!person.spouseId) return true;
      return person.id < person.spouseId;
  });

  // react-d3-tree requires a single root node
  return {
    name: 'Family Tree',
    children: filteredRoots,
  };
};


/**
 * Finds all upcoming events (birthdays, anniversaries) within a given number of days.
 * @param people - The list of all people.
 * @param days - The number of days to look ahead for events.
 * @returns An array of sorted upcoming events.
 */
export const getUpcomingEvents = (people: Person[], days: number): UpcomingEvent[] => {
  const events: UpcomingEvent[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const limitDate = new Date();
  limitDate.setDate(today.getDate() + days);

  const peopleMap = new Map(people.map(p => [p.id, p]));

  people.forEach(person => {
    const currentYear = today.getFullYear();

    // 1. Birthday
    if (!person.dateOfExpiry) {
      const dob = new Date(person.dob);
      let nextBirthday = new Date(currentYear, dob.getMonth(), dob.getDate());
      if (nextBirthday < today) {
        nextBirthday.setFullYear(currentYear + 1);
      }
      if (nextBirthday <= limitDate) {
        const daysUntil = Math.ceil((nextBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        const age = nextBirthday.getFullYear() - dob.getFullYear();
        events.push({
          personId: person.id,
          personName: person.name,
          type: 'Birthday',
          date: nextBirthday,
          daysUntil,
          age,
        });
      }
    }
    
    // 2. Marriage Anniversary
    if (person.dateOfMarriage && person.spouseId && person.id < person.spouseId) {
      const spouse = peopleMap.get(person.spouseId);
      if (spouse) {
        const dom = new Date(person.dateOfMarriage);
        let nextAnniversary = new Date(currentYear, dom.getMonth(), dom.getDate());
        if (nextAnniversary < today) {
          nextAnniversary.setFullYear(currentYear + 1);
        }

        if (nextAnniversary <= limitDate) {
          const daysUntil = Math.ceil((nextAnniversary.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
          const anniversaryYear = nextAnniversary.getFullYear() - dom.getFullYear();
          events.push({
            personId: person.id,
            personName: person.name,
            spouseName: spouse.name,
            type: 'Marriage Anniversary',
            date: nextAnniversary,
            daysUntil,
            anniversaryYear,
          });
        }
      }
    }

    // 3. Death Anniversary
    if (person.dateOfExpiry) {
      const doe = new Date(person.dateOfExpiry);
      let nextAnniversary = new Date(currentYear, doe.getMonth(), doe.getDate());
      if (nextAnniversary < today) {
        nextAnniversary.setFullYear(currentYear + 1);
      }
      if (nextAnniversary <= limitDate) {
        const daysUntil = Math.ceil((nextAnniversary.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        const anniversaryYear = nextAnniversary.getFullYear() - doe.getFullYear();
        events.push({
          personId: person.id,
          personName: person.name,
          type: 'Death Anniversary',
          date: nextAnniversary,
          daysUntil,
          anniversaryYear,
        });
      }
    }
  });

  return events.sort((a, b) => a.date.getTime() - b.date.getTime());
};