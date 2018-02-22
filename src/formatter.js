// Parse text and create attachment fields

const format = (text) => {
  const reg = new RegExp('(?:{)?(([^(){}]*)?[(].*?[)])(?:[}])?', 'gm');
  let fields = [],
    group,
    i = 0;

  while (group = reg.exec(text)) {
    const fallback = (!i) ? '¿Qué hice ayer?' : (i > 1) ? 'Anonymous group' : '¿Qué haré hoy?';
    const titled = new RegExp('^([^(]*?)\;', 'g').exec(group[1].trim());
    const tasks = new RegExp('[(](.*)[)]', 'g').exec(group[1].trim())[1].split(';');

    fields.push({
      title: (titled) ? titled[1].trim() : fallback,
      value: tasks.map(t => '\n- ' + t.trim()).join('') + '\n'
    });
    i++;
  }

  return fields;
}

module.exports = { format };
