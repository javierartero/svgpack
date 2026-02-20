const { execSync, execFileSync } = require('child_process');
const path = require('path');
const fs = require('fs');

describe('svgpack binary', () => {
  const testAssetsDir = path.join(__dirname, 'assets');
  const svgFiles = [
    'icon-arrow-right.svg',
    'icon-caret-down.svg',
    'icon-required.svg',
    'icon-search.svg',
  ];

  test('should execute without errors', () => {
    expect(() => {
      execSync('node bin/svgpack --help', {
        cwd: path.join(__dirname, '..'),
        stdio: 'pipe',
      });
    }).not.toThrow();
  });

  test('should process SVG files and generate CSS', () => {
    const cwd = path.join(__dirname, '..');
    const svgPaths = svgFiles.map((file) => path.join(testAssetsDir, file));
    const output = execFileSync(
      process.execPath,
      [path.join(cwd, 'bin/svgpack'), ...svgPaths],
      { cwd, encoding: 'utf8' }
    );

    // Check that output contains CSS variables
    expect(output).toContain('--icon-arrow-right:');
    expect(output).toContain('--icon-caret-down:');
    expect(output).toContain('--icon-required:');
    expect(output).toContain('--icon-search:');
  });

  test('should generate CSS with background classes when --background flag is used', () => {
    const cwd = path.join(__dirname, '..');
    const svgPaths = svgFiles.map((file) => path.join(testAssetsDir, file));
    const output = execFileSync(
      process.execPath,
      [path.join(cwd, 'bin/svgpack'), ...svgPaths, '--background'],
      { cwd, encoding: 'utf8' }
    );

    // Check that output contains CSS classes
    expect(output).toContain('.svgpack-background');
    expect(output).toContain('background: var(--image, var(--svgpack-image))');
  });

  test('should generate CSS with mask classes when --mask flag is used', () => {
    const cwd = path.join(__dirname, '..');
    const svgPaths = svgFiles.map((file) => path.join(testAssetsDir, file));
    const output = execFileSync(
      process.execPath,
      [path.join(cwd, 'bin/svgpack'), ...svgPaths, '--mask'],
      { cwd, encoding: 'utf8' }
    );

    // Check that output contains CSS classes
    expect(output).toContain('.svgpack-mask');
    expect(output).toContain('mask: var(--image, var(--svgpack-image))');
  });

  test('should output @theme and @utility when --tailwind is used', () => {
    const cwd = path.join(__dirname, '..');
    const svgPaths = svgFiles.map((file) => path.join(testAssetsDir, file));
    const output = execFileSync(
      process.execPath,
      [path.join(cwd, 'bin/svgpack'), ...svgPaths, '--tailwind'],
      { cwd, encoding: 'utf8' }
    );

    expect(output).toContain('@theme {');
    expect(output).toContain('@utility svgpack-*');
    expect(output).toContain('@utility svgpack-mask');
    expect(output).toContain('@utility svgpack-bg');
    expect(output).toContain('var(--image, var(--svgpack-image))');
    // Default prefix in tailwind mode: variables like --svgpack-icon-search
    expect(output).toContain('--svgpack-icon-search:');
  });

  test('should use custom prefix in variables when --tailwind --prefix is used', () => {
    const cwd = path.join(__dirname, '..');
    const svgPaths = svgFiles.map((file) => path.join(testAssetsDir, file));
    const output = execFileSync(
      process.execPath,
      [
        path.join(cwd, 'bin/svgpack'),
        ...svgPaths,
        '--tailwind',
        '--prefix',
        'icons',
      ],
      { cwd, encoding: 'utf8' }
    );

    expect(output).toContain('@theme {');
    expect(output).toContain('--icons-icon-search:');
    expect(output).not.toContain('--svgpack-icon-search:');
  });

  test('should keep standard mode unchanged when --tailwind is not used', () => {
    const cwd = path.join(__dirname, '..');
    const svgPaths = svgFiles.map((file) => path.join(testAssetsDir, file));
    const output = execFileSync(
      process.execPath,
      [path.join(cwd, 'bin/svgpack'), ...svgPaths],
      { cwd, encoding: 'utf8' }
    );

    expect(output).toContain(':root {');
    expect(output).not.toContain('@theme');
    expect(output).not.toContain('@utility');
    expect(output).toContain('--icon-search:');
  });

  test('should sanitize --prefix: spaces become hyphens', () => {
    const cwd = path.join(__dirname, '..');
    const svgPaths = svgFiles.map((file) => path.join(testAssetsDir, file));
    const output = execFileSync(
      process.execPath,
      [
        path.join(cwd, 'bin/svgpack'),
        ...svgPaths,
        '--tailwind',
        '--prefix',
        'my icons',
      ],
      { cwd, encoding: 'utf8' }
    );

    expect(output).toContain('--my-icons-icon-search:');
  });

  test('should sanitize --prefix: leading/trailing hyphens and invalid chars removed', () => {
    const cwd = path.join(__dirname, '..');
    const svgPaths = svgFiles.map((file) => path.join(testAssetsDir, file));
    const output = execFileSync(
      process.execPath,
      [
        path.join(cwd, 'bin/svgpack'),
        ...svgPaths,
        '--tailwind',
        '--prefix=--icons!!',
      ],
      { cwd, encoding: 'utf8' }
    );

    expect(output).toContain('--icons-icon-search:');
    expect(output).not.toMatch(/--icons!!/);
  });

  test('should handle non-existent files gracefully', () => {
    const command = 'node bin/svgpack non-existent-file.svg';

    expect(() => {
      execSync(command, {
        cwd: path.join(__dirname, '..'),
        stdio: 'pipe',
        encoding: 'utf8',
      });
    }).not.toThrow();
  });

  test('should show help when no arguments provided', () => {
    expect(() => {
      const output = execSync('node bin/svgpack', {
        cwd: path.join(__dirname, '..'),
        stdio: 'pipe',
        encoding: 'utf8',
      });

      // Should show help or usage information
      expect(output.length).toBeGreaterThan(0);
    }).not.toThrow();
  });
});
