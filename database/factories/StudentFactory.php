<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Student>
 */
class StudentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'stud_fname' => $this->faker->firstName(),
            'stud_mname' => $this->faker->optional()->firstName(),
            'stud_lname' => $this->faker->lastName(),
            'stud_status' => $this->faker->randomElement(['active', 'dropped']),
            'email' => $this->faker->unique()->safeEmail(),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
