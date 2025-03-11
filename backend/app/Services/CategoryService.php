<?php

namespace App\Services;

use App\Models\Category;
use App\Exceptions\BusinessException;

class CategoryService
{
    public function listAll()
    {
        return Category::all();
    }

    public function createCategory(array $data)
    {
        return Category::create($data);
    }

    public function deleteCategory(Category $category)
    {
        return $category->delete();
    }
}
