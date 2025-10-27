import React, { useMemo, useCallback, useState } from 'react';
import Tree from 'react-d3-tree';
import CustomNode from './CustomNode';
import { Person } from '../types';
import { buildHierarchyTree } from '../utils/helpers';
import type { Point } from 'react-d3-tree/lib/types/types/common';

interface FamilyTreeProps {
  people: Person[];
  onPersonClick: (person: Person) => void;
  selectedPersonId?: number;
  orientation: 'vertical' | 'horizontal';
}

const containerStyles: React.CSSProperties = {
  width: '100%',
  height: '100%',
};

const FamilyTree: React.FC<FamilyTreeProps> = ({ people, onPersonClick, selectedPersonId, orientation }) => {
  const treeData = useMemo(() => buildHierarchyTree(people), [people]);
  const [translate, setTranslate] = useState<Point>({ x: 0, y: 0 });
  
  const containerRef = useCallback((containerElem: HTMLDivElement | null) => {
    if (containerElem !== null) {
      const { width, height } = containerElem.getBoundingClientRect();
      // Center the tree on initial render and when orientation changes
      if (orientation === 'vertical') {
          setTranslate({ x: width / 2, y: 50 }); // Start near top
      } else {
          setTranslate({ x: 150, y: height / 2 }); // Start near left
      }
    }
  }, [orientation]);

  // This is to avoid a flash of unstyled content or errors on empty data.
  if (people.length === 0 || !treeData.children || treeData.children.length === 0) {
    return <div style={containerStyles} className="flex items-center justify-center text-gray-500"><p>No family data to display.</p></div>;
  }
  
  const nodeSize = { x: 300, y: 220 };
  const separation = { siblings: 1, nonSiblings: 1.2 };

  return (
    <div style={containerStyles} ref={containerRef}>
      <Tree
        data={treeData}
        orientation={orientation}
        pathFunc="step"
        collapsible={false}
        translate={translate}
        nodeSize={nodeSize}
        renderCustomNodeElement={(rd3tProps) => (
          <CustomNode
            {...rd3tProps}
            people={people}
            onPersonClick={onPersonClick}
            selectedPersonId={selectedPersonId}
          />
        )}
        separation={separation}
        centeringTransitionDuration={300}
        zoomable={true}
        draggable={true}
      />
    </div>
  );
};

export default FamilyTree;