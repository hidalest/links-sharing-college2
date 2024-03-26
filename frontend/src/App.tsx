import { Route, Routes } from 'react-router-dom';
import HomeLinks from './layout/HomeLinks/HomeLinks';

import { useAppSelector } from './hooks/hooks';
import Preview from './layout/Preview/Preview';

import data from './data.json';
import './App.scss';
import { routes } from './lib/routes';
import Authentication from './layout/Authentication/Authentication';

function App() {
  const { homeLinksData, previewPageProps, authenticationPhaseProps } = data;
  const username = useAppSelector((state) => state.userProfile.username);

  return (
    <div className='app'>
      <main className={'main'}>
        <Routes>
          <Route
            path={`${routes.authentication}`}
            element={
              <Authentication
                className={'authentication'}
                mainLogoDesktop={data.mainLogoDesktop}
                authenticationPhaseProps={authenticationPhaseProps}
              />
            }
          />
          <Route
            path={routes.home}
            element={
              <HomeLinks
                homeLinksData={homeLinksData}
                mainLogoDesktop={data.mainLogoDesktop}
                mainLogoSmall={data.mainLogoSmall}
              />
            }
          />
          {/* //BUG the navigation is working weard when there's no username */}
          <Route
            path={`/${routes.preview}/${username}`}
            element={<Preview previewPageProps={previewPageProps} />}
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
