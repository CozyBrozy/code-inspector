USE food_diary_db;

CREATE TABLE IF NOT EXISTS food_entries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    meal_description VARCHAR(255) NOT NULL COMMENT 'Beschreibung der Mahlzeit',
    calories INT NOT NULL COMMENT 'Kalorien in kcal',
    carbohydrates FLOAT NOT NULL COMMENT 'Kohlenhydrate in Gramm',
    protein FLOAT NOT NULL COMMENT 'Protein in Gramm',
    fat FLOAT NOT NULL COMMENT 'Fett in Gramm',
    created_at TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    meal_time TIMESTAMP(6) NULL DEFAULT NULL,
    INDEX idx_food_entries_meal_description (meal_description)
) COMMENT='Tabelle für Ernährungstagebuch-Einträge';

-- Füge Beispieldaten hinzu
INSERT INTO food_entries (meal_description, calories, carbohydrates, protein, fat, meal_time) VALUES
('Frühstück: Müsli mit Joghurt und Obst', 450, 75.5, 15.2, 10.8, '2023-10-27 08:00:00'),
('Mittagessen: Hähnchenbrust mit Reis und Gemüse', 620, 65.0, 55.5, 18.2, '2023-10-27 12:30:00'),
('Abendessen: Gemischter Salat mit Thunfisch', 380, 15.3, 30.1, 22.5, '2023-10-27 19:00:00'),
('Snack: Apfel', 95, 25.0, 0.5, 0.3, '2023-10-27 15:00:00');