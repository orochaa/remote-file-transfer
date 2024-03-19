import { DownloadPage, UploadPage } from '@/presentation/pages/index.js'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'

export function Router(): React.JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          // eslint-disable-next-line react/jsx-no-bind, react/no-unstable-nested-components
          Component={() => (
            <div className="dark">
              <Outlet />
            </div>
          )}
        >
          <Route path="" element={<UploadPage />} />
          <Route path=":uploadId" element={<DownloadPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
