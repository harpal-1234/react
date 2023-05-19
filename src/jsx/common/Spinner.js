import React from 'react'
import { Loader, Placeholder } from 'rsuite';

  
export default function Spinner() {
    return (
   
        <div>
        <Placeholder.Paragraph rows={8} />
        <Loader backdrop content="loading..." size="lg" />
      </div>
    );
}