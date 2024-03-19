import { UploadPage } from '@/presentation/pages/upload.js'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

export function Router(): React.JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<UploadPage />} />
      </Routes>
    </BrowserRouter>
  )
}
