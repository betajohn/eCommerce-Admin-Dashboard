'use client';
import Aside from './Aside';
import DBHead from './DBHead';
import DBBody from './DBBody';
import { Suspense, useState } from 'react';
import ProductsBody from '@/components/admin/products/ProductsBody';

export default function AdminDashboard() {
  const [show, setShow] = useState(false);
  const [panel, setPanel] = useState('Dashboard');

  return (
    <div className="min-h-screen p-2 flex justify-center gap-2">
      {!show && <Aside setPanel={setPanel} />}
      <div className="flex flex-col items-center min-h-full w-full gap-2">
        <DBHead
          setShow={setShow}
          show={show}
          setPanel={setPanel}
          panel={panel}
        />
        {panel === 'Dashboard' && <DBBody />}
        {panel === 'Products' && (
          <Suspense fallback={<p>Loading...</p>}>
            <ProductsBody />
          </Suspense>
        )}
      </div>
    </div>
  );
}
