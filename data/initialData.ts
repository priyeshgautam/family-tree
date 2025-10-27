import { Person } from '../types';
import { priyeshGautamImage } from './images';

export const initialData: Person[] = [
  // Generation 1
  {
    id: 1,
    name: "Chedda Lal",
    dob: "1939-07-05",
    placeOfBirth: "Unnao",
    parents: [],
    gender: "male",
    spouseId: 2,
    photoUrl: "https://i.pravatar.cc/150?u=1",
    dateOfExpiry: "2021-11-01",
    dateOfMarriage: "1964-05-20",
  },
  {
    id: 2,
    name: "Savitri",
    dob: "1952-03-20",
    placeOfBirth: "Kanpur",
    parents: [],
    gender: "female",
    spouseId: 1,
    photoUrl: "https://i.pravatar.cc/150?u=2",
    dateOfMarriage: "1964-05-20",
  },

  // Generation 2
  {
    id: 3,
    name: "Nimesh Kumar Nirmal",
    dob: "1965-07-02",
    placeOfBirth: "Unnao",
    parents: [1, 2],
    gender: "male",
    spouseId: 18,
    photoUrl: "https://i.pravatar.cc/150?u=3",
    dateOfMarriage: "1991-11-23"
  },
  {
    id: 18,
    name: "Sanghmitra",
    dob: "1970-01-01",
    placeOfBirth: "Delhi",
    parents: [],
    spouseId: 3,
    gender: "female",
    photoUrl: "https://i.pravatar.cc/150?u=18",
    dateOfMarriage: "1991-11-23"
  },
  {
    id: 4,
    name: "Neelam Gautam",
    dob: "1972-02-01",
    placeOfBirth: "Kanpur",
    parents: [1,2],
    gender: "female",
    photoUrl: "https://i.pravatar.cc/150?u=4",
    dateOfMarriage: "1998-05-20",
  },
  {
    id: 5,
    name: "Saroj Gautam",
    dob: "1972-11-30",
    placeOfBirth: "Kanpur",
    parents: [1, 2],
    gender: "female",
    spouseId: 21,
    photoUrl: "https://i.pravatar.cc/150?u=5",
    dateOfMarriage: "1993-05-20",
  },
  {
    id: 21,
    name: "Ram Narain",
    dob: "1970-01-01",
    placeOfBirth: "Delhi",
    spouseId: 5,
    parents: [],
    gender: "male",
    photoUrl: "https://i.pravatar.cc/150?u=21",
    dateOfMarriage: "1993-05-20",
  },
  {
    id: 6,
    name: "Anil Gautam",
    dob: "1975-01-01",
    placeOfBirth: "Kanpur",
    parents: [1, 2],
    gender: "male",
    spouseId: 20,
    photoUrl: "https://i.pravatar.cc/150?u=6",
    dateOfMarriage: "1995-05-20",

  },
  {
    id: 20,
    name: "Suman Gautam",
    dob: "1977-01-01",
    placeOfBirth: "Delhi",
    spouseId: 6,
    parents: [],
    gender: "female",
    photoUrl: "https://i.pravatar.cc/150?u=20",
    dateOfMarriage: "1995-05-20"
  },
  {
    id: 7,
    name: "Sunil Gautam",
    dob: "1978-01-01",
    placeOfBirth: "Kanpur",
    parents: [1, 2],
    gender: "male",
    spouseId: 19,
    photoUrl: "https://i.pravatar.cc/150?u=7",
    dateOfMarriage: "2007-05-20"
  },
  {
    id: 19,
    name: "Indu Jaisalwal",
    dob: "1980-01-01",
    placeOfBirth: "Delhi",
    parents: [],
    spouseId: 7,
    gender: "female",
    photoUrl: "https://i.pravatar.cc/150?u=19",
    dateOfMarriage: "2007-05-20"
  },

  // Generation 3
  {
    id: 8,
    name: "Niharika Gautam",
    dob: "2000-07-01",
    placeOfBirth: "Delhi",
    parents: [4],
    spouseId: 22,
    gender: "female",
    photoUrl: "https://i.pravatar.cc/150?u=8"
  },
  {
    id: 22,
    name: "Divyanshu Gautam",
    dob: "2000-07-01",
    placeOfBirth: "Delhi",
    parents: [],
    spouseId: 8,
    gender: "male",
    photoUrl: "https://i.pravatar.cc/150?u=22"
  },
  {
    id: 9,
    name: "Snehal Gautam",
    dob: "1993-11-01",
    placeOfBirth: "Delhi",
    parents: [3, 18],
    gender: "female",
    photoUrl: "https://i.pravatar.cc/150?u=9"
  },
  {
    id: 12,
    name: "Priyesh Gautam",
    dob: "2005-01-01",
    placeOfBirth: "Delhi",
    parents: [3, 18],
    gender: "male",
    photoUrl: priyeshGautamImage
  },
  {
    id: 10,
    name: "Sonalika Gautam",
    dob: "2004-01-01",
    placeOfBirth: "Delhi",
    parents: [5, 21],
    gender: "female",
    photoUrl: "https://i.pravatar.cc/150?u=10"
  },
  {
    id: 11,
    name: "Sanjeevni Gautam",
    dob: "2006-01-01",
    placeOfBirth: "Delhi",
    parents: [5, 21],
    gender: "female",
    photoUrl: "https://i.pravatar.cc/150?u=11"
  },
  {
    id: 13,
    name: "Priyanshu Gautam",
    dob: "2005-06-01",
    placeOfBirth: "Delhi",
    parents: [6, 20],
    gender: "male",
    photoUrl: "https://i.pravatar.cc/150?u=13"
  },
  {
    id: 14,
    name: "Sahil Gautam",
    dob: "2007-01-01",
    placeOfBirth: "Delhi",
    parents: [6, 20],
    gender: "male",
    photoUrl: "https://i.pravatar.cc/150?u=14"
  },
  {
    id: 15,
    name: "Anvita Gautam",
    dob: "2008-01-01",
    placeOfBirth: "Delhi",
    parents: [7, 19],
    gender: "female",
    photoUrl: "https://i.pravatar.cc/150?u=15"
  },
  {
    id: 16,
    name: "Anika Gautam",
    dob: "2010-01-01",
    placeOfBirth: "Delhi",
    parents: [7, 19],
    gender: "female",
    photoUrl: "https://i.pravatar.cc/150?u=16"
  },

  // Generation 4
  {
    id: 17,
    name: "Agustya Gautam",
    dob: "2022-01-01",
    placeOfBirth: "Delhi",
    parents: [8, 22],
    gender: "male",
    photoUrl: "https://i.pravatar.cc/150?u=17"
  },
];
