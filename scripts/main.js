









const DATA_PATH = 'data/Test.json';

loadLevelExperienceDataPaths(DATA_PATH);

function loadLevelExperienceDataPaths(dataPath)
{
  console.info('Reading: "' + dataPath + '"');
  fetch(dataPath)
    .then(response =>
    {
      if (response.ok)
      {
        return response.json();
      }
      else
      {
        console.error('Configuration was not ok.');
      }
    })
    .then(resultTemp =>
    {
      console.log(resultTemp);
    })
    .catch (function(error)
    {
      console.error('Error in fetching: ' + error);
    })
}








const LEVEL_EXPERIENCE_DATA_PATHS_PATH = 'data/LevelExperienceDataPaths.json';

//loadLevelExperienceDataPaths(LEVEL_EXPERIENCE_DATA_PATHS_PATH);

/**
 * Load and setup all the games' level experience data.
 *
 * @param levelExperienceDataPathsPath Relative path of the json file that contains the list of relative paths of json files that each point to a game's level experience data
 */
function loadLevelExperienceDataPaths(levelExperienceDataPathsPath)
{
  console.info('Reading: "' + levelExperienceDataPathsPath + '"');
  fetch(levelExperienceDataPathsPath)
    .then(response =>
    {
      if (response.ok)
      {
        return response.json();
      }
      else
      {
        console.error('Configuration was not ok.');
      }
    })
    .then(levelExperienceDataPaths =>
    {
      console.info('levelExperienceDataPaths:');
      console.log(levelExperienceDataPaths);
      
      let levelExperienceDataList = [];
      for (let i = 0; i < levelExperienceDataPaths.length; i++)
      {
        fetch(levelExperienceDataPaths[i])
          .then(response =>
          {
            if (response.ok)
            {
              return response.json();
            }
            else
            {
              console.error('Configuration was not ok.');
            }
          })
          .then(levelExperienceData =>
          {
            levelExperienceDataList.push(levelExperienceData);
          })
          .catch (function(error)
          {
            console.error('Error in fetching: ' + error);
          })
          .finally (function()
          {
            levelExperienceDataList.sort(function(levelExperienceData1, levelExperienceData2)
            {
              return levelExperienceData1.gameName > levelExperienceData2.gameName;
            });
            // TODO: Figure out how to call only once?
            console.info('levelExperienceDataList:');
            console.log(levelExperienceDataList);
            setupSelectMenu(levelExperienceDataList);
            setupReferencesTab(levelExperienceDataList);
          });
      }
    })
    .catch (function(error)
    {
      console.error('Error in fetching: ' + error);
    })
}
