import { prismaMock } from '../prismaClientMock';
import { getCategories, getCategoryById, createCategory, updateCategory, deleteCategory } from '../../../src/api/repositories/categoryRepository';
import { Category } from '@prisma/client';

describe('categoryRepository', () => {
  const mockCategory: Category = { id: 1, name: 'Electronics', description: 'Electronic items', status: true };

  beforeEach(() => {
    prismaMock.category.findMany.mockReset();
    prismaMock.category.findUnique.mockReset();
    prismaMock.category.create.mockReset();
    prismaMock.category.update.mockReset();
    prismaMock.category.delete.mockReset();
  });

  it('should get all categories', async () => {
    prismaMock.category.findMany.mockResolvedValue([mockCategory]);

    const categories = await getCategories();
    expect(categories).toEqual([mockCategory]);
    expect(prismaMock.category.findMany).toHaveBeenCalled();
  });

  it('should get a category by id', async () => {
    prismaMock.category.findUnique.mockResolvedValue(mockCategory);

    const category = await getCategoryById(1);
    expect(category).toEqual(mockCategory);
    expect(prismaMock.category.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  it('should create a new category', async () => {
    const newCategory = { name: 'Books', description: 'Books category', status: true };
    prismaMock.category.create.mockResolvedValue({ id: 2, ...newCategory });

    const category = await createCategory(newCategory);
    expect(category).toEqual({ id: 2, ...newCategory });
    expect(prismaMock.category.create).toHaveBeenCalledWith({ data: newCategory });
  });

  it('should update a category', async () => {
    const updatedCategory = { name: 'Home Appliances', description: 'Home appliances category', status: true };
    prismaMock.category.update.mockResolvedValue({ id: 1, ...updatedCategory });

    const category = await updateCategory(1, updatedCategory);
    expect(category).toEqual({ id: 1, ...updatedCategory });
    expect(prismaMock.category.update).toHaveBeenCalledWith({ where: { id: 1 }, data: updatedCategory });
  });

  it('should delete a category', async () => {
    prismaMock.category.delete.mockResolvedValue(mockCategory);

    const category = await deleteCategory(1);
    expect(category).toEqual(mockCategory);
    expect(prismaMock.category.delete).toHaveBeenCalledWith({ where: { id: 1 } });
  });
});