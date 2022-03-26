
const DATA_PATH = 'data/Test.json';

loadData(DATA_PATH);

function loadData(dataPath)
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


      let groupsHtml = '';
      for (let group of resultTemp.groups)
      {
        groupsHtml += generateGroup(group.name, group.items, false);
      }

      
      document.getElementById("htmlWrapper").innerHTML = groupsHtml;
    })
    .catch (function(error)
    {
      console.error('Error in fetching: ' + error);
    })
}


/*
Tier
1: Known missable
2: Items of interest
*/




/**
 * Generates HTML for list item.
 *
 * @param name Group name
 * @param items Item list
 * @param checked True if group is checked
 * @returns HTML for group
 */
function generateGroup(name, items, checked)
{
  const nameHtml = name;
  let listItemsHtml = '';
  for (let item of items)
  {
    listItemsHtml += generateItem(item.icon, item.name, item.tier, false);
  }
  const checkedHtml = checked ? 'checked' : '';
  return `
    <ul id="${nameHtml}" class="${checkedHtml}">
      ${listItemsHtml}
    </ul>
  `;
}

/**
* Generates HTML for list item.
*
* @param icon Material Icon text
* @param name Item name
* @param tier Tier number
* @param checked True if item is checked
* @returns HTML for list item
*/
function generateItem(icon, name, tier, checked)
{
  const tierHtml = 'T' + tier;
  const checkedHtml = checked ? 'checked' : '';
  return `
    <li class="${tierHtml} ${checkedHtml}">
      <i class="material-icons" style="font-size: 30px; color: black;">${icon}</i>${name}
    </li>
  `;
}
