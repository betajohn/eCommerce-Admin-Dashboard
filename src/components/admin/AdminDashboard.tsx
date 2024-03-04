'use client';
import Aside from './Aside';
import DBHead from './DBHead';
import DBBody from './DBBody';
import { useState } from 'react';

export default function AdminDashboard() {
  const [show, setShow] = useState(false);

  return (
    <div className="h-full w-full p-2 flex flex-col items-center justify-center gap-2">
      <DBHead setShow={setShow} show={show} />
      <div className="flex items-center justify-center h-full w-full gap-2">
        {!show && <Aside />}
        <DBBody />
      </div>
    </div>
  );
}
