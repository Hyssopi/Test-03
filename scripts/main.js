
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





      // List script
      const lists = Array.prototype.slice.call(document.querySelectorAll('ul'));
      for (const list of lists)
      {
        list.addEventListener('click', function(e)
        {
          if (e.target.tagName === 'LI')
          {
            e.target.classList.toggle('checked');
          }
        }, false);
      };







      // Accordion script
      const accordions = document.getElementsByClassName('accordion');
      for (const accordion of accordions)
      {
        accordion.addEventListener('click', function()
        {
          this.classList.toggle('active');
          const panel = this.nextElementSibling;
          if (panel.style.maxHeight)
          {
            panel.style.maxHeight = null;
          }
          else
          {
            panel.style.maxHeight = panel.scrollHeight + 'px';
          }
        });
      }
    })
    .catch (function(error)
    {
      console.error('Error in fetching: ' + error);
    })
}




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
  const classAttributes = checked ? 'checked' : '';

  let listItemsHtml = '';
  for (let item of items)
  {
    listItemsHtml += generateItem(item.icon, item.name, false);
  }
  
  return `
    <button class="accordion">${name}</button>
    <div class="panel">
      <ul class="${classAttributes}">
        ${listItemsHtml}
      </ul>
    </div>
  `;
}

/**
* Generates HTML for list item.
*
* @param icon Material Icon text
* @param name Item name
* @param checked True if item is checked
* @returns HTML for list item
*/
function generateItem(icon, name, checked)
{
  let classAttributes = checked ? ' checked' : '';
  return `
    <li class="${classAttributes}">
      <div style="pointer-events: none; display: flex; align-items: center;">
        <i class="material-icons icons" style="color: red;">${icon}</i>${name}
      </div>
    </li>
  `;
}
