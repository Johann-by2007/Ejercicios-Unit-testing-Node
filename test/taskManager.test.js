const TaskManager = require('../src/taskManager');

describe('TaskManager', () => {

  let manager;

  beforeEach(() => {
    manager = new TaskManager();
  });

  it('una tarea nueva inicia con completed false', () => {
    const task = manager.addTask('Aprender Jest');

    expect(task.completed).toBe(false);
  });

  it('addTask aumenta el total de tareas', () => {
    manager.addTask('Tarea 1');

    expect(manager.getAll().length).toBe(1);
  });

  it('completeTask cambia el estado correctamente', () => {
    const task1 = manager.addTask('Estudiar');
    const task2 = manager.addTask('Practicar');

    manager.completeTask(task1.id);

    expect(task1.completed).toBe(true);
    expect(task2.completed).toBe(false);
  });

  it('removeTask disminuye el total de tareas', () => {
    const task = manager.addTask('Eliminar tarea');

    manager.removeTask(task.id);

    expect(manager.getAll().length).toBe(0);
  });

  it('getPending devuelve solo tareas pendientes', () => {
    const task1 = manager.addTask('Pendiente');
    const task2 = manager.addTask('Completa');

    manager.completeTask(task2.id);

    const pending = manager.getPending();

    expect(pending.length).toBe(1);
    expect(pending[0].title).toBe('Pendiente');
  });

  it('getCompleted devuelve solo tareas completadas', () => {
    const task1 = manager.addTask('Pendiente');
    const task2 = manager.addTask('Completa');

    manager.completeTask(task2.id);

    const completed = manager.getCompleted();

    expect(completed.length).toBe(1);
    expect(completed[0].title).toBe('Completa');
  });

  it('lanza error si el id no existe', () => {
    expect(() => manager.completeTask(999))
      .toThrow(Error);

    expect(() => manager.removeTask(999))
      .toThrow(Error);
  });

  it('lanza error si el título está vacío', () => {
    expect(() => manager.addTask(''))
      .toThrow(Error);
  });

});